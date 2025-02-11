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
let news;

// XMLHttpRequestインスタンスを作成
const request = new XMLHttpRequest();
// JSONファイルが置いてあるパスを記述
request.open('GET', './scripts/src/news.json');
request.send();
// JSON読み込み時の処理
request.onreadystatechange = () => {
    // 全てのデータを受信・正常に処理された場合
    if (request.readyState == 4 && request.status == 200) {
        // JSONデータを変換
        news = JSON.parse(request.responseText);
    }
}

const availablePages = {
    previous: false,
    next: false,
    offset: 0
}

// ボタン要素を取得
const nextPage = document.getElementById("nextPage");
const previousPage = document.getElementById("previousPage");

function loadNews(offset = 0) {
    availablePages.next = false;
    availablePages.previous = false;
    nextPage.style.opacity = 0.2;
    previousPage.style.opacity = 0.2;

    element.innerHTML = "";

    // 最新情報を取得し、 10この新着情報を掲載する
    for (let i = offset; i < offset + 10; i++) {
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
    if (news.length - offset - 10 > 0) {
        // 次ページを許可する
        availablePages.next = true;
        nextPage.style.opacity = 1;
    }
    if (offset !== 0) {
        // 前ページを許可する
        availablePages.previous = true;
        previousPage.style.opacity = 1;
    }
}

// エラーログを消去
if (news.length) {
    document.getElementById("error").remove();
    loadNews(0);
}

// 次のページを読み込む
function readNextPage() {
    if (availablePages.next) {
        availablePages.offset += 10;
        loadNews(availablePages.offset);
    }
}

// 前のページを読み込む
function readPreviousPage() {
    if (availablePages.previous) {
        availablePages.offset -= 10;
        loadNews(availablePages.offset);
    }
}