import { news } from "./src/news.json";

window.onload = () => {
    history.scrollRestoration = "manual";
};

document.addEventListener("contextmenu", ev => {
    ev.preventDefault();
});

document.addEventListener("dragstart", ev => {
    ev.preventDefault();
});

document.addEventListener("selectstart", ev => {
    ev.preventDefault();
});

// 要素を取得
const element = document.getElementById("news");

// エラーログを消去
if (news.length) {
    document.getElementById("error").remove();

    // 最新情報を取得し、 上位3つの新着情報を掲載する
    for (let i = 0; i < 3; i++) {
        // 最新情報を取得
        const item = news[i];
        if (!item) {
            break;
        }
        // クラス付divを作成
        const div = document.createElement("div");
        div.classList.add("element");
        // detailsを作成
        const details = document.createElement("details");
        // summaryを作成 (見出し)
        const summary = document.createElement("summary");
        summary.classList.add("dropdown");
        // summaryのテキストノードを追加
        summary.appendChild(document.createTextNode(item.title));
        // spanを作成 (投稿日時)
        const span = document.createElement("span");
        span.textContent = item.date;
        // summaryにspanを付け足す
        summary.appendChild(span);
        // detailsにsummaryを足す
        details.appendChild(summary);
        // detailsにpタグを付ける
        for (const text of item.description) {
            const p = document.createElement("p");
            p.textContent = text;
            details.appendChild(p);
        }
        // divにdetailsを足す
        div.appendChild(details);
        // 最終的にコンテナを追加
        element.appendChild(div);
    }

    element.appendChild(document.createElement("hr"));

    const div = document.createElement("div");
    div.classList.add("padding");
    element.appendChild(div);

    const a = document.createElement("a");
    a.href = "news.html";
    a.classList.add("buttonText");
    const button = document.createElement("div");
    button.classList.add("button");
    button.textContent = "お知らせを開く";
    a.appendChild(button);
    element.appendChild(a);
}