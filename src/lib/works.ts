export interface Work {
  id: string;
  type: "paper" | "project";
  title: string;
  venue?: string;
  year: number;
  period?: string;
  tech?: string[];
  description?: string;
  url?: string;
  urlLabel?: string;
}

export const works: Work[] = [
  {
    id: "shuttle-bus-reservation",
    type: "project",
    title: "大学キャンパスシャトルバス予約システム",
    year: 2024,
    period: "2023年11月 〜 2024年4月（5ヶ月）",
    tech: ["Docker", "Nginx", "Python", "Flask", "Jinja2"],
    description: "大学から学生団体を通して請け負ったシャトルバス予約システムの開発案件。バス4台・座席20席の座席指定予約をWebアプリで実現し、3Dプリンタで自作した学生証タッチ認証機器と連携して乗車可否を判断するシステムを構築。チームリーダとして、Web開発経験者0の状態からgitやWebサーバの仕組みを率先して習得・説明しながら開発を牽引し、運用開始目標日までに完成させた。現在は後輩に引き継ぎ、毎年800人以上の学生に利用されている。",
  },
  {
    id: "minpaku-app",
    type: "project",
    title: "民泊予約アプリ",
    year: 2025,
    period: "2025年7月 〜 2025年10月（3ヶ月）",
    tech: ["Flutter", "Dart", "Firebase", "GitHub Actions"],
    description: "不動産・民泊運営企業から請け負った専用予約アプリの開発案件。一人での開発のため、Android/iOS両対応をFlutter＋Firebaseのクロスプラットフォーム構成で実現。民泊紹介Webサイトのインフラ構築およびCI/CD環境の整備も担当した。",
  },
  {
    id: "public-cloud",
    type: "project",
    title: "パブリッククラウド自作",
    year: 2026,
    description: "AWS相当のパブリッククラウドをフルスクラッチで構築。Kubernetes上にTinkerbell・ClusterAPI・ArgoCD・Knative・KubeVirtを組み合わせ、IAM・テナント管理・コンテナサービス・仮想マシン機能を実装。",
    url: "https://qiita.com/daigo-suhara/items/5fddc494ae53d8967656",
    urlLabel: "Qiitaで読む",
  },
  {
    id: "hai2026-hug-robot",
    type: "paper",
    title: "ヒューマノイド型抱擁ロボットにおける手指動作の影響に関する一検討",
    venue: "HAIシンポジウム2026",
    year: 2026,
    description: "抱擁ロボットにおける手指動作の有無やパターンがユーザに与える心理的影響を実験的に検証。複数回動作や非同期動作が感覚を高める傾向や、一斉動作が思いやりの認知に影響することを示した。HAIシンポジウム2026にて口頭発表。",
    url: "https://hai-conference.net/symp2026/proceedings/pdf/G-27.pdf",
    urlLabel: "PDFを開く",
  },
];
