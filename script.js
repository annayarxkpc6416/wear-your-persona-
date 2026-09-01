const pages = {
  home: document.querySelector("#home-page"),
  quiz: document.querySelector("#quiz-page"),
  loading: document.querySelector("#loading-page"),
  result: document.querySelector("#result-page")
};

const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const questionCount = document.querySelector("#question-count");
const questionTitle = document.querySelector("#question-title");
const optionsContainer = document.querySelector("#options");
const progressBar = document.querySelector("#progress-bar");
const resultTitle = document.querySelector("#result-title");
const resultDescription = document.querySelector("#result-description");

const resultTypes = {
  A: {
    title: "A｜極簡質感型",
    description: "你偏好乾淨線條、低調配色與耐看的單品。比起流行速度，你更在意衣服是否舒服、實穿、有品質。"
  },
  B: {
    title: "B｜街頭混搭型",
    description: "你的風格有行動感與個性，喜歡用帽款、球鞋、寬鬆版型或亮眼小物表達態度。"
  },
  C: {
    title: "C｜甜美柔和型",
    description: "你適合溫柔、親切、有細節的穿搭，像是柔和色彩、針織、裙裝或帶有浪漫感的元素。"
  },
  D: {
    title: "D｜知性俐落型",
    description: "你的衣格重視清楚、有精神與好整理。襯衫、西裝外套、直筒褲等單品很能襯托你的氣質。"
  },
  E: {
    title: "E｜復古文藝型",
    description: "你喜歡帶有故事感的穿搭，能駕馭復古色、格紋、牛仔、皮革或帶一點舊時代味道的單品。"
  },
  F: {
    title: "F｜亮眼創意型",
    description: "你不怕嘗試新鮮組合，適合鮮明色彩、特殊剪裁或有趣圖案。穿搭對你來說是一種創作。"
  }
};

const questions = [
  {
    question: "清晨，你醒來後推開一間只為你亮起的衣櫥。燈光慢慢落在衣架、鞋盒與飾品上，像今天的你還沒有被世界定義。第一眼吸引你的，是哪一組畫面？",
    text: "清晨，你醒來後推開一間只為你亮起的衣櫥。燈光慢慢落在衣架、鞋盒與飾品上，像今天的你還沒有被世界定義。第一眼吸引你的，是哪一組畫面？",
    options: [
      {
        text: "冷白襯衫、銀灰寬褲、霧藍長外套與一只俐落斜背包，畫面乾淨，線條安靜地對齊。",
        image: "images/q01-a.png",
        scores: { A: 2, E: 1 }
      },
      {
        text: "奶油色長裙、酒紅絲絨外套與珍珠耳飾，柔和又復古，像舊電影裡的一幕。",
        image: "images/q01-b.png",
        scores: { B: 2, C: 1 }
      },
      {
        text: "粉藍短版外套、白色短裙與黑色蝴蝶結，精緻甜美，但輪廓很清楚。",
        image: "images/q01-c.png",
        scores: { C: 2, B: 1 }
      },
      {
        text: "黑色長外套、深藍高領與暗紅皮靴，色彩沉穩，帶著安靜的距離感。",
        image: "images/q01-d.png",
        scores: { D: 2, A: 1 }
      }
    ]
  },
  {
    question: "你站在鏡前整理頭髮，今天沒有特別正式的行程，你打算去市中心的百貨逛街。你希望衣服先替你說出哪一種第一印象？",
    text: "你站在鏡前整理頭髮，今天沒有特別正式的行程，你打算去市中心的百貨逛街。你希望衣服先替你說出哪一種第一印象？",
    options: [
      {
        text: "一件剪裁服貼的白襯衫配灰色直筒長褲，乾淨、冷靜、有距離感，像每個細節都被精準安排過。",
        scores: { A: 2, C: 1 }
      },
      {
        text: "一身復古襯衫與長裙走進百貨，連耳飾和鞋子都帶著細緻的年代感，整個人優雅又柔和。",
        scores: { B: 2, F: 1 }
      },
      {
        text: "短版外套、珍珠釦肩背小包與裸色系妝感，讓你看起來自信又張揚，精緻、漂亮，還帶一點小傲氣。",
        scores: { C: 2, A: 1 }
      },
      {
        text: "一件寬鬆針織衫配舒適的牛仔褲，自在、舒服，像沒有刻意準備，卻不失氣質與風格。",
        scores: { F: 2, E: 1 }
      }
    ]
  },
  {
    question: "出門前，你只想選一件「今天的主角單品」。它不一定最華麗，但會決定你整天的氣質。你會伸手拿起哪一件？",
    text: "出門前，你只想選一件「今天的主角單品」。它不一定最華麗，但會決定你整天的氣質。你會伸手拿起哪一件？",
    options: [
      {
        text: "一件剪裁俐落的長版外套，搭上深色內搭後，整體立刻沉靜下來、有了重量，帶一點不容易讀懂的距離感。",
        image: "images/q03-1.png",
        scores: { D: 2, A: 1 }
      },
      {
        text: "一件帶蕾絲領口的復古襯衫，搭長裙或瑪莉珍鞋時，會讓整套穿搭變得柔和又有故事感。",
        image: "images/q03-2.png",
        scores: { B: 2, C: 1 }
      },
      {
        text: "一件短版毛呢外套，搭配小包與亮面皮鞋，會讓整個人看起來精緻、亮眼，像是出門前有認真打理過。",
        image: "images/q03-3.png",
        scores: { C: 2, A: 1 }
      },
      {
        text: "一件寬鬆外套，裡面搭舒適上衣，再配上好走的鞋子；既能自由行動，也不會顯得太用力。",
        image: "images/q03-4.png",
        scores: { E: 2, F: 1 }
      }
    ]
  },
  {
    question: "你走進城市裡一場小型展覽開幕，來的人穿得各有風格。這不是正式晚宴，也不是普通聚會；每個人都像把自己的審美帶進白牆與燈光裡。你最想讓自己停留在哪一種畫面中？",
    text: "你走進城市裡一場小型展覽開幕，來的人穿得各有風格。這不是正式晚宴，也不是普通聚會；每個人都像把自己的審美帶進白牆與燈光裡。你最想讓自己停留在哪一種畫面中？",
    options: [
      {
        text: "一件白色系大衣或俐落西裝外套，站在白牆旁，讓灰黑線條成為展場裡最安靜的存在。",
        image: "images/q04-1.png",
        scores: { A: 2, D: 1 }
      },
      {
        text: "復古襯衫、緞面長裙與珍珠耳飾在燈下帶著柔光，像從舊畫報走進現場。",
        image: "images/q04-2.png",
        scores: { B: 2, C: 1 }
      },
      {
        text: "一件柔軟針織衫配寬鬆長褲，自在，不特別講究造型，但站在人群裡很舒服。",
        image: "images/q04-3.png",
        scores: { F: 2, B: 1 }
      },
      {
        text: "寬版外套、斜背包與球鞋讓你能自由穿過人群，不被場地綁住。",
        image: "images/q04-4.png",
        scores: { E: 2, A: 1 }
      }
    ]
  },
  {
    question: "展覽中途，你發現自己最在意的不是別人的眼光，而是衣服貼近身體時的感覺。你最容易被哪一種材質吸引？",
    text: "展覽中途，你發現自己最在意的不是別人的眼光，而是衣服貼近身體時的感覺。你最容易被哪一種材質吸引？",
    options: [
      {
        text: "棉麻或法蘭絨（帶毛絨感、柔軟保暖的厚織布），舒服，讓身體可以放鬆呼吸。",
        image: "images/q05-1.png",
        scores: { F: 2, A: 1 }
      },
      {
        text: "緞面（帶柔亮光澤的布料）、蕾絲與珍珠細節，觸感柔和，像把浪漫藏在細節裡。",
        image: "images/q05-2.png",
        scores: { B: 2, C: 1 }
      },
      {
        text: "粗花呢（帶顆粒感、略蓬鬆的厚織布）、金屬釦與亮面皮革，精緻但不柔弱，帶一點小脾氣。",
        image: "images/q05-3.png",
        scores: { C: 2, D: 1 }
      },
      {
        text: "尼龍（輕、防潑水感的機能布）、丹寧與厚磅棉料，耐穿、能動，像衣服本身就有行動力。",
        image: "images/q05-4.png",
        scores: { E: 2, F: 1 }
      }
    ]
  },
  {
    question: "離開展覽後，你走進一間安靜的咖啡館。窗外城市還在移動，但你暫時不想被打擾。這時候，你希望衣服替你完成什麼事？",
    text: "離開展覽後，你走進一間安靜的咖啡館。窗外城市還在移動，但你暫時不想被打擾。這時候，你希望衣服替你完成什麼事？",
    options: [
      {
        text: "一件剪裁俐落的西裝外套，替我整理好外在秩序，就算心裡混亂，看起來也不能失控。",
        scores: { A: 2, D: 1 }
      },
      {
        text: "一件帶蕾絲領口的柔軟針織衫，替我保留一點柔軟，不必把所有話都說得太滿。",
        scores: { B: 2, F: 1 }
      },
      {
        text: "深色高領搭一件長版外套，替我拉出一條邊界，讓別人知道我現在不想被靠近。",
        scores: { D: 2, A: 1 }
      },
      {
        text: "換上厚底球鞋和斜背包，替我準備好離開的力氣，能走很遠，不用在意姿態是否完美。",
        scores: { E: 2, F: 1 }
      }
    ]
  },
  {
    question: "朋友臨時替你拍了一張照片。你沒有刻意擺姿勢，只是站在街角、燈光和玻璃反射之間。你希望照片裡的自己最接近哪種狀態？",
    text: "朋友臨時替你拍了一張照片。你沒有刻意擺姿勢，只是站在街角、燈光和玻璃反射之間。你希望照片裡的自己最接近哪種狀態？",
    options: [
      {
        text: "一件黑色系的高領或長版外套，冷靜、有戒備感，像不需要靠表情也能成立的畫面，卻又精緻得讓人多看一眼。",
        image: "images/q07-1.png",
        scores: { D: 2, C: 1 }
      },
      {
        text: "穿著帶珍珠釦的復古襯衫，溫柔、復古，像一張被保存很久的舊照片。",
        image: "images/q07-2.png",
        scores: { B: 2, D: 1 }
      },
      {
        text: "一件剪裁精緻的短版外套配上珍珠胸針，精緻、明亮，像每個細節都剛好漂亮得有意圖。",
        image: "images/q07-3.png",
        scores: { C: 2, B: 1 }
      },
      {
        text: "寬版外套配上球鞋，率性、自由，像下一秒就會離開鏡頭繼續往前走。",
        image: "images/q07-4.png",
        scores: { E: 2, F: 1 }
      }
    ]
  },
  {
    question: "如果你的理想衣櫃不像收納櫃，而像一個小型展覽，你最不能接受它變成哪一種樣子？",
    text: "如果你的理想衣櫃不像收納櫃，而像一個小型展覽，你最不能接受它變成哪一種樣子？",
    options: [
      {
        text: "顏色太亂、裝飾太多，所有單品都在搶話。",
        scores: { A: 2, D: 1 }
      },
      {
        text: "太輕飄、太明亮，完全沒有重量或態度，連一件可以撐過壞天氣或壞心情的外套都沒有。",
        scores: { D: 2, E: 1 }
      },
      {
        text: "太普通、太隨便，看不出精緻度，也沒有被打理過的感覺。",
        scores: { C: 2, A: 1 }
      },
      {
        text: "太拘束、太嬌貴，衣服只能被小心展示，沒辦法真的陪你過日子，穿起來也不自在。",
        scores: { F: 2, E: 1 }
      }
    ]
  },
  {
    question: "夜晚回家的路上，心情忽然低下來。你不想解釋自己，也不想被安慰，只想讓衣服替你擋住一部分世界。你會選哪一種方式？",
    text: "夜晚回家的路上，心情忽然低下來。你不想解釋自己，也不想被安慰，只想讓衣服替你擋住一部分世界。你會選哪一種方式？",
    options: [
      {
        text: "一件版型極簡、沒有任何多餘細節的大衣，讓自己重新回到秩序裡，不需要解釋什麼。",
        scores: { A: 2, F: 1 }
      },
      {
        text: "深色長外套與皮靴，像把情緒收進衣料深處，暫時不讓任何人碰到。",
        scores: { D: 2, A: 1 }
      },
      {
        text: "寬鬆外套、深色球鞋與斜背包，出門走一走，讓身體先離開壞情緒。",
        scores: { E: 2, D: 1 }
      },
      {
        text: "柔軟針織、寬鬆襯衫與低飽和色，先讓身體被好好安放。",
        scores: { F: 2, B: 1 }
      }
    ]
  },
  {
    question: "回到房間後，你再次站在鏡前。今天的衣服、城市、展覽、人群和情緒都慢慢安靜下來。你替自己的風格寫下一句宣言，會是哪一句？",
    text: "回到房間後，你再次站在鏡前。今天的衣服、城市、展覽、人群和情緒都慢慢安靜下來。你替自己的風格寫下一句宣言，會是哪一句？",
    options: [
      {
        text: "「越簡單，越能看出品味。」",
        scores: { A: 2, D: 1 }
      },
      {
        text: "「我想把浪漫穿得像日常，也把日常保存成記憶。」",
        scores: { B: 2, F: 1 }
      },
      {
        text: "「可愛不是幼稚，是被精心控制過的吸引力。」",
        scores: { C: 2, D: 1 }
      },
      {
        text: "「舒服不是隨便，是更接近自己。」",
        scores: { F: 2, E: 1 }
      }
    ]
  }
];

let currentQuestionIndex = 0;
let scores = createEmptyScores();
let isAnswerLocked = false;

function createEmptyScores() {
  return { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
}

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[pageName].classList.add("active");
}

function startQuiz() {
  currentQuestionIndex = 0;
  scores = createEmptyScores();
  isAnswerLocked = false;
  showPage("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  isAnswerLocked = false;
  questionCount.textContent = `Question ${questionNumber} / ${questions.length}`;
  questionTitle.textContent = question.text;
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
  optionsContainer.innerHTML = "";
  optionsContainer.classList.toggle("has-images", question.options.some((option) => option.image));

  question.options.forEach((option) => {
    const questionIndex = currentQuestionIndex;
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";

    if (option.image) {
      const image = document.createElement("img");
      image.className = "option-image";
      image.src = option.image;
      image.alt = option.text.slice(0, 20);
      image.loading = "lazy";
      button.appendChild(image);
    }

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = option.text;
    button.appendChild(text);

    button.addEventListener("click", () => chooseOption(option.scores, questionIndex));
    optionsContainer.appendChild(button);
  });
}

function chooseOption(optionScores, questionIndex) {
  if (isAnswerLocked || questionIndex !== currentQuestionIndex) {
    return;
  }

  isAnswerLocked = true;
  optionsContainer.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  Object.entries(optionScores).forEach(([type, value]) => {
    scores[type] += value;
  });

  currentQuestionIndex += 1;

  if (currentQuestionIndex >= questions.length) {
    showLoadingThenResult();
    return;
  }

  renderQuestion();
}

function showLoadingThenResult() {
  progressBar.style.width = "100%";
  showPage("loading");

  setTimeout(() => {
    showResult();
  }, 3000);
}

function showResult() {
  const winner = Object.keys(scores).reduce((bestType, type) => {
    return scores[type] > scores[bestType] ? type : bestType;
  }, "A");

  resultTitle.textContent = resultTypes[winner].title;
  resultDescription.textContent = resultTypes[winner].description;
  showPage("result");
}

function restartQuiz() {
  currentQuestionIndex = 0;
  scores = createEmptyScores();
  isAnswerLocked = false;
  progressBar.style.width = "0";
  showPage("home");
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

