import { ArrowRight, Eraser } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mascot } from '../shell/Mascot';
import { BigButton } from '../ui/BigButton';
import type { ActivityProps } from './activityTypes';

const CANVAS_SIZE = 280;

function drawTargetOnCtx(ctx: CanvasRenderingContext2D, target: string, style: 'template' | 'guide') {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const stroke = style === 'template' ? '#000000' : '#CBD5E1';
  const width = style === 'template' ? 28 : 16;

  ctx.strokeStyle = stroke;
  ctx.fillStyle = stroke;
  ctx.lineWidth = width;
  if (style === 'guide') ctx.setLineDash([8, 8]);

  const cx = CANVAS_SIZE / 2;
  const cy = CANVAS_SIZE / 2;

  if (target === 'circle') {
    ctx.beginPath();
    ctx.arc(cx, cy, 86, 0, Math.PI * 2);
    ctx.stroke();
  } else if (target === 'square') {
    ctx.strokeRect(cx - 80, cy - 80, 160, 160);
  } else if (target === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 86);
    ctx.lineTo(cx + 88, cy + 74);
    ctx.lineTo(cx - 88, cy + 74);
    ctx.closePath();
    ctx.stroke();
  } else if (target === 'star') {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 90 : 40;
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.font = '800 185px "Baloo 2", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (style === 'template') {
      ctx.fillText(target, cx, cy + 8);
    } else {
      ctx.strokeText(target, cx, cy + 8);
    }
  }
  ctx.restore();
}

export const TraceActivity: React.FC<ActivityProps> = ({ activity, level, audio, onDone }) => {
  const target = activity.target || 'A';
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const templateDataRef = useRef<Uint8ClampedArray | null>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  const [coverage, setCoverage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const resetCanvas = useCallback(() => {
    const draw = drawCanvasRef.current;
    const guide = guideCanvasRef.current;
    if (!draw || !guide) return;

    const gCtx = guide.getContext('2d');
    if (gCtx) drawTargetOnCtx(gCtx, target, 'guide');

    const dCtx = draw.getContext('2d');
    if (dCtx) dCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Offscreen template for pixel coverage check
    const off = document.createElement('canvas');
    off.width = CANVAS_SIZE;
    off.height = CANVAS_SIZE;
    const oCtx = off.getContext('2d');
    if (oCtx) {
      drawTargetOnCtx(oCtx, target, 'template');
      templateDataRef.current = oCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE).data;
    }
    setCoverage(0);
    setCompleted(false);
  }, [target]);

  useEffect(() => {
    resetCanvas();
    audio.speak(`Trace ${target}!`, 0.85);
  }, [resetCanvas]);

  const computeCoverage = () => {
    const draw = drawCanvasRef.current;
    const tmpl = templateDataRef.current;
    if (!draw || !tmpl) return;
    const dCtx = draw.getContext('2d');
    if (!dCtx) return;
    const drawn = dCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE).data;

    let tmplPixels = 0;
    let covered = 0;
    // Sample every 2nd pixel (step 8 bytes) for speed
    for (let i = 3; i < tmpl.length; i += 8) {
      if (tmpl[i] > 50) {
        tmplPixels++;
        if (drawn[i] > 50) covered++;
      }
    }
    const pct = tmplPixels ? Math.min(100, Math.round((covered / tmplPixels) * 100)) : 100;
    setCoverage(pct);
    if (pct >= 68 && !completed) {
      setCompleted(true);
      audio.playSfx('celebrate');
      audio.speak(`Great tracing! ${target}!`, 0.85);
    }
  };

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE,
    };
  };

  const handleDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastPtRef.current = getPoint(e);
  };

  const handleMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !lastPtRef.current) return;
    const ctx = drawCanvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pt = getPoint(e);
    ctx.strokeStyle = level.color;
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPtRef.current = pt;
  };

  const handleUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPtRef.current = null;
    computeCoverage();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <div className="flex items-center gap-3">
        <Mascot pose={completed ? 'cheer' : 'point'} size="sm" />
        <div className="font-kid font-extrabold text-2xl text-slate-800">
          ✏️ Tô theo nét nào! ({coverage}%)
        </div>
      </div>

      <div className="relative w-[280px] h-[280px] rounded-[32px] bg-white border-4 border-amber-200 shadow-lg overflow-hidden touch-none">
        <canvas
          ref={guideCanvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="absolute inset-0 pointer-events-none"
        />
        <canvas
          ref={drawCanvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerCancel={handleUp}
          className="absolute inset-0 cursor-crosshair touch-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <BigButton color="#94A3B8" shadowColor="#64748B" size="md" onClick={resetCanvas}>
          <Eraser className="w-5 h-5" />
          <span>Tô lại</span>
        </BigButton>

        <BigButton
          color={level.color}
          shadowColor={level.colorDark}
          size="lg"
          onClick={() => {
            audio.playSfx('ding');
            onDone();
          }}
        >
          <span>{completed ? 'Đẹp quá!' : 'Xong rồi'}</span>
          <ArrowRight className="w-6 h-6" />
        </BigButton>
      </div>
    </div>
  );
};
