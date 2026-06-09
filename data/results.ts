export type SaturationLevel = "muted" | "natural" | "vivid";
export type LightnessLevel = "high" | "mid" | "low";

export type ResultType = {
  id: string;
  title: string;
  subtitle: string;
  colorName: string;
  hex: string;
  image: string;
  description: string;
  keywords: string[];
  saturation: SaturationLevel;
  lightness: LightnessLevel;
};

export const resultTypes: ResultType[] = [
  {
    id: "bright",
    title: "Bright Purple",
    subtitle: "맑고 선명한 퍼플",
    colorName: "Bright Purple",
    hex: "#E0ACFF",
    image: "/visuals/bright-purple.png.jpg",
    description: "선명한 방향감은 있지만 선택의 압력은 가볍게 유지하는 톤입니다. 생각의 색이 밝게 드러나며, 다른 관점과 만날 여지도 넓게 남깁니다.",
    keywords: ["선명함", "가벼운 강도", "개방감"],
    saturation: "vivid",
    lightness: "high",
  },
  {
    id: "vivid",
    title: "Vivid Purple",
    subtitle: "또렷한 중심형 퍼플",
    colorName: "Vivid Purple",
    hex: "#9800FF",
    image: "/visuals/vivid-purple.png.jpg",
    description: "자신의 기준과 감각이 비교적 또렷하게 드러나는 타입입니다. 흐릿한 결론보다 색이 분명한 선택을 선호하지만, 강도는 균형 있게 조절합니다.",
    keywords: ["또렷함", "중심", "균형 강도"],
    saturation: "vivid",
    lightness: "mid",
  },
  {
    id: "strong",
    title: "Strong Purple",
    subtitle: "짙고 강한 퍼플",
    colorName: "Strong Purple",
    hex: "#3F0070",
    image: "/visuals/strong-purple.png.jpg",
    description: "채도와 선택 강도가 모두 높은 타입입니다. 자기 기준이 분명하고, 애매한 중간보다 밀도 있는 판단을 통해 색을 깊게 남깁니다.",
    keywords: ["강한 선택", "고채도", "밀도"],
    saturation: "vivid",
    lightness: "low",
  },
  {
    id: "soft",
    title: "Soft Purple",
    subtitle: "부드러운 중간톤 퍼플",
    colorName: "Soft Purple",
    hex: "#F2DBFF",
    image: "/visuals/soft-purple.png.jpg",
    description: "생각의 방향은 중간톤에 가깝고 선택 강도는 낮은 편입니다. 여러 가능성을 열어두며, 색이 과하게 굳기 전에 맥락을 더 살피려 합니다.",
    keywords: ["부드러움", "열린 판단", "중간톤"],
    saturation: "natural",
    lightness: "high",
  },
  {
    id: "natural",
    title: "Natural Purple",
    subtitle: "자연스러운 균형 퍼플",
    colorName: "Natural Purple",
    hex: "#B76DE2",
    image: "/visuals/natural-purple.png.jpg",
    description: "채도와 선택 강도가 모두 가운데에 놓인 타입입니다. 어느 한쪽의 색으로 단정하기보다, 상황에 맞는 농도와 균형점을 찾는 데 익숙합니다.",
    keywords: ["균형", "상황감", "자연스러움"],
    saturation: "natural",
    lightness: "mid",
  },
  {
    id: "deep",
    title: "Deep Purple",
    subtitle: "깊이 있는 중간톤 퍼플",
    colorName: "Deep Purple",
    hex: "#502668",
    image: "/visuals/deep-purple.png.jpg",
    description: "방향은 중간톤에 머물지만 선택의 강도는 깊습니다. 쉽게 흔들리지는 않되, 한 가지 색으로 과하게 단순화하지 않는 묵직한 톤입니다.",
    keywords: ["깊이", "신중한 확신", "묵직함"],
    saturation: "natural",
    lightness: "low",
  },
  {
    id: "pale",
    title: "Pale Purple",
    subtitle: "옅고 차분한 퍼플",
    colorName: "Pale Purple",
    hex: "#F0ECF2",
    image: "/visuals/pale-purple.png.jpg",
    description: "채도와 선택 강도가 모두 낮아 차분하고 여백이 많은 톤입니다. 강한 단정보다 낮은 갈등, 조용한 합의, 유연한 해석을 선호합니다.",
    keywords: ["차분함", "여백", "낮은 강도"],
    saturation: "muted",
    lightness: "high",
  },
  {
    id: "muted",
    title: "Muted Purple",
    subtitle: "단정한 저채도 퍼플",
    colorName: "Muted Purple",
    hex: "#D6C1E3",
    image: "/visuals/muted-purple.png.jpg",
    description: "선택의 강도는 적당하지만 전체 톤은 낮은 채도에 가깝습니다. 선명한 주장보다 조정 가능한 기준과 현실적인 온도를 중요하게 둡니다.",
    keywords: ["저채도", "조정", "현실감"],
    saturation: "muted",
    lightness: "mid",
  },
  {
    id: "dark",
    title: "Dark Purple",
    subtitle: "짙고 절제된 퍼플",
    colorName: "Dark Purple",
    hex: "#6A5974",
    image: "/visuals/dark-purple.png.jpg",
    description: "낮은 채도 안에서도 선택의 강도는 분명한 타입입니다. 화려하게 드러내기보다 절제된 톤으로 자기 판단의 무게를 지킵니다.",
    keywords: ["절제", "분명함", "무게감"],
    saturation: "muted",
    lightness: "low",
  },
];
