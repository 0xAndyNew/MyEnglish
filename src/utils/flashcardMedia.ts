import type { AudienceId } from '../types/audience';

/**
 * 6 Learner Audience Cards — 3D Studio Illustrations (#FFFFFF background)
 */
export const AUDIENCE_IMAGE_MAP: Record<AudienceId, string> = {
  preschool: '/img/art/aud-preschool.webp',
  kids: '/img/art/aud-kids.webp',
  teen: '/img/art/aud-teen.webp',
  university: '/img/art/aud-university.webp',
  worker: '/img/art/aud-worker.webp',
  exam: '/img/art/aud-exam.webp',
};

/**
 * 5 Exam Certification Cards — 3D Studio Illustrations (#FFFFFF background)
 */
export const EXAM_IMAGE_MAP: Record<string, string> = {
  ielts: '/img/art/exam-ielts.webp',
  toeic: '/img/art/exam-toeic.webp',
  toefl: '/img/art/exam-toefl.webp',
  vstep: '/img/art/exam-vstep.webp',
  cambridge: '/img/art/exam-cambridge.webp',
};

/**
 * Known studio-centered vocabulary slugs in `/preschool/img/words/<slug>.webp`
 */
const DIRECT_WORD_SLUGS = new Set([
  'dog', 'cat', 'bird', 'duck', 'cow', 'rabbit', 'lion', 'elephant', 'fox',
  'apple', 'banana', 'milk', 'water', 'bread', 'rice', 'egg', 'ball', 'car',
  'mommy', 'daddy', 'baby', 'sister', 'brother', 'grandma', 'grandpa', 'hug', 'teacher',
  'head', 'eyes', 'ears', 'nose', 'mouth', 'hands', 'toes', 'happy', 'sad',
  'sleepy', 'hungry', 'hello', 'bye-bye', 'wake-up', 'brush-teeth', 'play', 'jump', 'run',
  'bath', 'sleep', 'sun', 'rainy', 'cloudy', 'tree', 'flower', 'hot', 'cold',
  'doll', 'blocks', 'teddy', 'train', 'kite', 'book', 'bag', 'pencil', 'crayon',
  'bedroom', 'kitchen', 'bathroom', 'bed', 'chair', 'table', 'door', 'school', 'friend',
  'red', 'blue', 'yellow', 'green', 'circle', 'square', 'triangle', 'star', 'rainbow',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
  'trophy', 'heart', 'medal',
  'hat', 'shirt', 'shoes', 'socks', 'dress', 'pants', 'coat', 'jacket', 'shorts', 'glasses', 'umbrella',
  'bus', 'bike', 'plane', 'boat', 'taxi', 'truck', 'helicopter', 'motorbike', 'ship',
  'mango', 'grapes', 'tomato', 'potato', 'corn', 'jam', 'balloon', 'present', 'candle',
  'doctor', 'nurse', 'farmer', 'cook', 'chef', 'police-officer', 'firefighter', 'pilot', 'driver', 'singer',
  'fish', 'crab', 'shark', 'whale', 'octopus', 'turtle', 'dolphin', 'shell', 'starfish',
  'tiger', 'monkey', 'giraffe', 'zebra', 'bear', 'snake', 'hippo', 'goat', 'frog',
  'pig', 'sheep', 'horse', 'chicken', 'rooster', 'butterfly', 'bee', 'ladybug', 'ant',
  'pizza', 'cake', 'ice-cream', 'juice', 'noodles', 'cookie', 'carrot', 'watermelon', 'strawberry',
  'slide', 'swing', 'seesaw', 'sandbox', 'bubble', 'robot', 'skateboard', 'yo-yo',
  'moon', 'sunny', 'windy', 'snowy', 'stormy', 'leaf', 'spring', 'summer', 'autumn', 'winter',
  'river', 'mountain', 'candy', 'box', 'music', 'tet', 'lucky-money', 'lantern', 'mooncake',
  'fireworks', 'christmas', 'santa', 'halloween', 'card', 'grass', 'mushroom', 'nest',
  'insect', 'web', 'van', 'queen', 'swim', 'dance', 'sing', 'climb', 'fly', 'clap', 'wave',
  'read', 'drawing', 'cycling', 'football', 'basketball', 'badminton', 'tennis',
  'pen', 'ruler', 'eraser', 'desk', 'house', 'window', 'garden', 'sofa', 'living-room',
  'angry', 'thirsty', 'scared', 'excited', 'park', 'library', 'hospital', 'supermarket',
  'bakery', 'cinema', 'post-office', 'clock', 'morning', 'night', 'calendar', 'hair',
  'wash-face', 'have-breakfast', 'have-lunch', 'do-homework', 'go-to-bed',
  'orange', 'purple', 'pink', 'rectangle', 'oval', 'diamond', 'cube', 'line', 'party-hat',
]);

/**
 * Common English synonyms / plurals / phrases mapped cleanly to exact studio artwork
 */
const WORD_ALIASES: Record<string, string> = {
  // Family / People
  mother: '/preschool/img/words/mommy.webp',
  mom: '/preschool/img/words/mommy.webp',
  father: '/preschool/img/words/daddy.webp',
  dad: '/preschool/img/words/daddy.webp',
  family: '/preschool/img/words/hug.webp',
  children: '/preschool/img/words/friend.webp',
  friends: '/preschool/img/words/friend.webp',
  boy: '/preschool/img/words/brother.webp',
  girl: '/preschool/img/words/sister.webp',
  grandfather: '/preschool/img/words/grandpa.webp',
  grandmother: '/preschool/img/words/grandma.webp',

  // Body singulars & plurals
  eye: '/preschool/img/words/eyes.webp',
  ear: '/preschool/img/words/ears.webp',
  hand: '/preschool/img/words/hands.webp',
  foot: '/preschool/img/words/toes.webp',
  feet: '/preschool/img/words/toes.webp',
  toe: '/preschool/img/words/toes.webp',

  // Animals & Pets
  puppy: '/preschool/img/words/dog.webp',
  dogs: '/preschool/img/words/dog.webp',
  kitten: '/preschool/img/words/cat.webp',
  cats: '/preschool/img/words/cat.webp',
  birds: '/preschool/img/words/bird.webp',
  bunny: '/preschool/img/words/rabbit.webp',
  hen: '/preschool/img/words/chicken.webp',

  // Objects / Toys / School / Food
  books: '/preschool/img/words/book.webp',
  'teddy bear': '/preschool/img/words/teddy.webp',
  'ice cream': '/preschool/img/words/ice-cream.webp',
  gift: '/preschool/img/words/present.webp',
  toys: '/preschool/img/words/blocks.webp',
  balloons: '/preschool/img/words/balloon.webp',
  apples: '/preschool/img/words/apple.webp',
  bananas: '/preschool/img/words/banana.webp',
  eggs: '/preschool/img/words/egg.webp',
  carrot: '/preschool/img/words/carrot.webp',
  strawberries: '/preschool/img/words/strawberry.webp',
  grape: '/preschool/img/words/grapes.webp',
  coffee: '/preschool/img/words/juice.webp',
  tea: '/preschool/img/words/juice.webp',
  cupcake: '/preschool/img/words/cake.webp',
  breakfast: '/preschool/img/words/have-breakfast.webp',
  lunch: '/preschool/img/words/have-lunch.webp',
  dinner: '/preschool/img/words/have-lunch.webp',
  apartment: '/preschool/img/words/house.webp',
  home: '/preschool/img/words/house.webp',
  couch: '/preschool/img/words/sofa.webp',
  pillow: '/preschool/img/words/bed.webp',
  watch: '/preschool/img/words/clock.webp',
  backpack: '/preschool/img/words/bag.webp',

  // Routine & Actions
  'wake up': '/preschool/img/words/wake-up.webp',
  'brush my teeth': '/preschool/img/words/brush-teeth.webp',
  'wash my face': '/preschool/img/words/wash-face.webp',
  'have breakfast': '/preschool/img/words/have-breakfast.webp',
  'go to school': '/preschool/img/words/school.webp',
  'have lunch': '/preschool/img/words/have-lunch.webp',
  'do homework': '/preschool/img/words/do-homework.webp',
  'take a shower': '/preschool/img/words/bath.webp',
  'have dinner': '/preschool/img/words/have-lunch.webp',
  'go to bed': '/preschool/img/words/sleep.webp',
  swimming: '/preschool/img/words/swim.webp',
  singing: '/preschool/img/words/sing.webp',
  dancing: '/preschool/img/words/dance.webp',
  reading: '/preschool/img/words/read.webp',
  running: '/preschool/img/words/run.webp',
  jumping: '/preschool/img/words/jump.webp',
  playing: '/preschool/img/words/play.webp',
  hi: '/preschool/img/words/hello.webp',
  goodbye: '/preschool/img/words/bye-bye.webp',

  // Nature & Weather & Sky
  rain: '/preschool/img/words/rainy.webp',
  cloud: '/preschool/img/words/cloudy.webp',
  snow: '/preschool/img/words/snowy.webp',
  wind: '/preschool/img/words/windy.webp',
  sky: '/preschool/img/words/sunny.webp',
  flowers: '/preschool/img/words/flower.webp',
  trees: '/preschool/img/words/tree.webp',
  sea: '/preschool/img/words/whale.webp',
  ocean: '/preschool/img/words/whale.webp',

  // Kids Holidays / Days
  'santa claus': '/preschool/img/words/santa.webp',
  'lucky money': '/preschool/img/words/lucky-money.webp',
  parade: '/preschool/img/words/fireworks.webp',
  wish: '/preschool/img/words/star.webp',
  monday: '/preschool/img/words/calendar.webp',
  tuesday: '/preschool/img/words/calendar.webp',
  wednesday: '/preschool/img/words/calendar.webp',
  thursday: '/preschool/img/words/calendar.webp',
  friday: '/preschool/img/words/calendar.webp',
  saturday: '/preschool/img/words/calendar.webp',
  sunday: '/preschool/img/words/calendar.webp',
  zoo: '/preschool/img/words/elephant.webp',
  playground: '/preschool/img/words/slide.webp',

  // Work / Academic / Core 980 concrete nouns & common verbs
  computer: '/img/art/concept-laptop.webp',
  laptop: '/img/art/concept-laptop.webp',
  technology: '/img/art/concept-laptop.webp',
  software: '/img/art/concept-laptop.webp',
  internet: '/img/art/concept-globe.webp',
  network: '/img/art/concept-globe.webp',
  phone: '/img/art/concept-speech.webp',
  communication: '/img/art/concept-speech.webp',
  communicate: '/img/art/concept-speech.webp',
  office: '/img/art/concept-office.webp',
  company: '/img/art/concept-office.webp',
  meeting: '/img/art/concept-meeting.webp',
  collaborate: '/img/art/concept-meeting.webp',
  teamwork: '/img/art/concept-meeting.webp',
  handshake: '/img/art/concept-meeting.webp',
  contract: '/img/art/concept-contract.webp',
  report: '/img/art/concept-chart.webp',
  data: '/img/art/concept-chart.webp',
  growth: '/img/art/concept-chart.webp',
  economy: '/img/art/concept-chart.webp',
  money: '/img/art/concept-money.webp',
  salary: '/img/art/concept-money.webp',
  budget: '/img/art/concept-money.webp',
  price: '/img/art/concept-money.webp',
  expensive: '/img/art/concept-money.webp',
  cheap: '/img/art/concept-money.webp',
  bank: '/img/art/concept-money.webp',
  research: '/img/art/concept-microscope.webp',
  science: '/img/art/concept-microscope.webp',
  university: '/img/art/concept-graduation.webp',
  graduate: '/img/art/concept-graduation.webp',
  study: '/img/art/concept-graduation.webp',
  exam: '/img/art/concept-graduation.webp',
  brain: '/img/art/concept-brain.webp',
  think: '/img/art/concept-brain.webp',
  idea: '/img/art/concept-lightbulb.webp',
  solution: '/img/art/concept-lightbulb.webp',
  breakthrough: '/img/art/concept-rocket.webp',
  goal: '/img/art/concept-target.webp',
  target: '/img/art/concept-target.webp',
  law: '/img/art/concept-law.webp',
  rule: '/img/art/concept-law.webp',
  healthy: '/img/art/concept-health.webp',
  health: '/img/art/concept-health.webp',
  medicine: '/img/art/concept-health.webp',
  travel: '/img/art/concept-travel.webp',
  airport: '/img/art/concept-travel.webp',
  flight: '/img/art/concept-travel.webp',
  ticket: '/img/art/concept-travel.webp',
  search: '/img/art/concept-search.webp',
  find: '/img/art/concept-search.webp',
  write: '/img/art/concept-writing.webp',
  listen: '/img/art/concept-headphones.webp',
  time: '/img/art/concept-clock.webp',
  schedule: '/img/art/concept-calendar.webp',
  key: '/img/art/concept-key.webp',
  safe: '/img/art/concept-shield.webp',
  protect: '/img/art/concept-shield.webp',
  sustainable: '/img/art/concept-nature.webp',
  environment: '/img/art/concept-nature.webp',
  confident: '/preschool/img/words/happy.webp',
  glad: '/preschool/img/words/happy.webp',
  joyful: '/preschool/img/words/happy.webp',
  unhappy: '/preschool/img/words/sad.webp',
  afraid: '/preschool/img/words/scared.webp',
  tired: '/preschool/img/words/sleepy.webp',
  airplane: '/preschool/img/words/plane.webp',
  pot: '/preschool/img/words/kitchen.webp',
  love: '/preschool/img/words/heart.webp',
};

const TOPIC_ART_MAP: Record<string, string> = {
  'Giao tiếp': '/img/art/concept-speech.webp',
  'Con người': '/img/art/concept-people.webp',
  'Thời gian': '/img/art/concept-clock.webp',
  'Số đếm': '/preschool/img/words/one.webp',
  'Nhà cửa': '/img/art/concept-home.webp',
  'Ẩm thực': '/img/art/concept-food.webp',
  'Hành động': '/img/art/concept-rocket.webp',
  'Du lịch': '/img/art/concept-travel.webp',
  'Mua sắm': '/preschool/img/words/supermarket.webp',
  'Mô tả': '/preschool/img/words/drawing.webp',
  'Cảm xúc': '/preschool/img/words/happy.webp',
  'Công việc': '/img/art/concept-office.webp',
  'Công nghệ': '/img/art/concept-laptop.webp',
  'Học thuật': '/img/art/concept-graduation.webp',
  'Sức khỏe': '/img/art/concept-health.webp',
  'Thiên nhiên': '/img/art/concept-nature.webp',
  'Xã hội': '/img/art/concept-globe.webp',
  'Kết nối': '/img/art/concept-meeting.webp',
  'Đời sống': '/img/art/concept-lightbulb.webp',
};

const VI_MEANING_ART: { pattern: RegExp; src: string }[] = [
  { pattern: /\b(vui|hạnh phúc|hào hứng|mỉm cười)\b/i, src: '/preschool/img/words/happy.webp' },
  { pattern: /\b(buồn|cô đơn|khóc|thất vọng)\b/i, src: '/preschool/img/words/sad.webp' },
  { pattern: /\b(tức giận|giận|nóng giận)\b/i, src: '/preschool/img/words/angry.webp' },
  { pattern: /\b(mệt|buồn ngủ|ngủ)\b/i, src: '/preschool/img/words/sleepy.webp' },
  { pattern: /\b(sợ|lo lắng|hồi hộp)\b/i, src: '/preschool/img/words/scared.webp' },
  { pattern: /\b(nóng|ấm|lửa|mùa hè)\b/i, src: '/preschool/img/words/hot.webp' },
  { pattern: /\b(lạnh|mát|tuyết|mùa đông)\b/i, src: '/preschool/img/words/cold.webp' },
  { pattern: /\b(bệnh|ốm|đau|thuốc|bác sĩ|bệnh viện|sức khỏe|khỏe)\b/i, src: '/img/art/concept-health.webp' },
  { pattern: /\b(nước|uống|trà|cà phê|sữa)\b/i, src: '/preschool/img/words/juice.webp' },
  { pattern: /\b(ăn|bánh|cơm|thức ăn|quả|trái|bữa|đói)\b/i, src: '/img/art/concept-food.webp' },
  { pattern: /\b(xe|tàu|máy bay|du lịch|vé|sân bay|chuyến bay)\b/i, src: '/img/art/concept-travel.webp' },
  { pattern: /\b(nhà|phòng|cửa|bàn|ghế|giường)\b/i, src: '/img/art/concept-home.webp' },
  { pattern: /\b(sách|học|viết|trường|thi|bài|đọc|nghiên cứu|tốt nghiệp)\b/i, src: '/img/art/concept-graduation.webp' },
  { pattern: /\b(tiền|giá|mua|bán|đắt|rẻ|ngân hàng|lương|kinh tế)\b/i, src: '/img/art/concept-money.webp' },
  { pattern: /\b(công việc|công ty|họp|sếp|dự án|văn phòng|hợp đồng)\b/i, src: '/img/art/concept-office.webp' },
  { pattern: /\b(mạng|máy tính|điện thoại|công nghệ|dữ liệu|phần mềm)\b/i, src: '/img/art/concept-laptop.webp' },
  { pattern: /\b(ngày|giờ|tháng|năm|tuần|sáng|tối|lịch|đồng hồ)\b/i, src: '/img/art/concept-clock.webp' },
  { pattern: /\b(mặt trời|mưa|gió|cây|hoa|biển|trời|thiên nhiên|môi trường)\b/i, src: '/img/art/concept-nature.webp' },
  { pattern: /\b(gia đình|mẹ|bố|bạn|người|con|em|anh|chị|nhóm)\b/i, src: '/img/art/concept-family.webp' },
  { pattern: /\b(ý tưởng|sáng tạo|giải pháp|hiểu|suy nghĩ|não)\b/i, src: '/img/art/concept-lightbulb.webp' },
  { pattern: /\b(luật|quy định|chính sách|công bằng|quyền)\b/i, src: '/img/art/concept-law.webp' },
  { pattern: /\b(tăng|giảm|biểu đồ|phân tích|thống kê)\b/i, src: '/img/art/concept-chart.webp' },
  { pattern: /\b(nghe|nói|trò chuyện|giao tiếp|hội thoại)\b/i, src: '/img/art/concept-speech.webp' },
];

/**
 * Resolves any English word, phrase, Vietnamese meaning, or curriculum topic
 * into a centered white-background (.webp) flashcard illustration URL.
 */
export function resolveFlashcardImage(
  word: string,
  meaningVi = '',
  topicId?: string
): string {
  const lower = word.trim().toLowerCase();
  const hyphenated = lower.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  if (WORD_ALIASES[lower]) return WORD_ALIASES[lower];
  if (DIRECT_WORD_SLUGS.has(lower)) return `/preschool/img/words/${lower}.webp`;
  if (DIRECT_WORD_SLUGS.has(hyphenated)) return `/preschool/img/words/${hyphenated}.webp`;

  // Singular fallback (strip trailing s/es)
  const singular = hyphenated.replace(/ies$/, 'y').replace(/(s|es)$/, '');
  if (WORD_ALIASES[singular]) return WORD_ALIASES[singular];
  if (DIRECT_WORD_SLUGS.has(singular)) return `/preschool/img/words/${singular}.webp`;

  // Vietnamese meaning fallback
  if (meaningVi) {
    const matched = VI_MEANING_ART.find((rule) => rule.pattern.test(meaningVi));
    if (matched) return matched.src;
  }

  // Curriculum topic fallback
  if (topicId && TOPIC_ART_MAP[topicId]) {
    return TOPIC_ART_MAP[topicId];
  }

  return '/img/art/concept-lightbulb.webp';
}
