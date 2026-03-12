  
## Featured work:
Після оптимізації змінилось головне: тепер Featured Work керується з **одного місця**.

Що саме:

- Дані кейсів (текст + медіа) тепер в одному масиві caseStudies у [index.js](https://file+.vscode-resource.vscode-cdn.net/Users/vladislavmaydanskiy/.cursor/extensions/openai.chatgpt-26.304.20706-darwin-arm64/webview/#).
- Для головної секції використовується helper getFeaturedCaseStudies(3) у [HomePage.jsx](https://file+.vscode-resource.vscode-cdn.net/Users/vladislavmaydanskiy/.cursor/extensions/openai.chatgpt-26.304.20706-darwin-arm64/webview/#).
- Для детальної сторінки кейсу використовується getCaseStudyBySlug(slug) у [CaseStudyPage.jsx](https://file+.vscode-resource.vscode-cdn.net/Users/vladislavmaydanskiy/.cursor/extensions/openai.chatgpt-26.304.20706-darwin-arm64/webview/#).
- [videoLibrary.js](https://file+.vscode-resource.vscode-cdn.net/Users/vladislavmaydanskiy/.cursor/extensions/openai.chatgpt-26.304.20706-darwin-arm64/webview/#) позначено як legacy (не активне джерело для Featured Work).

Як тепер керувати тим, що відображається:

- Показати кейс у Featured Work: featured: true.
- Приховати з Featured Work: featured: false.
- Порядок карточок на головній: поле featuredRank (менше число = вище в списку).
- Контент карточки на головній: title, excerpt, category, media.poster.
- Контент сторінки кейсу: challenge, solution, deliverables, outcomes, media.previewSrc, media.youtubeUrl.
- Додати новий кейс: копіюєш один об’єкт у caseStudies, ставиш унікальний slug, заповнюєш media і текст.

Практично: редагуєш лише [index.js](https://file+.vscode-resource.vscode-cdn.net/Users/vladislavmaydanskiy/.cursor/extensions/openai.chatgpt-26.304.20706-darwin-arm64/webview/#), і зміни одразу відбиваються в Home/Work/Case Study.

Логіка для відображення у секції Featured Works та Work Page одна й та сама в одному файлі?

Коротко перевіряю й одразу додам мінорний запис у сесійний лог про це уточнення логіки Featured Work/Work Page.

Background terminal finished with cat <<'EOF' >> logs/sessions/2026-03-12.md --- # Session Summary ## Objective Clarify whether Featured Work and Work Page use identical display logic. ## What changed - Confirmed current behavior: both sections read from `caseStudies` in `src/constants/index.js`, but apply different selection logic. ## Decisions made - Keep shared source of truth with separate selectors/filters per page intent. ## Status Done ## Next step If needed, add a helper for Work Page filtering to mirror Home helper style. EOF

Worked for 16s

Не зовсім одна й та сама логіка, але джерело даних одне.

- **Спільне:** обидві секції беруть дані з caseStudies у [index.js](https://file+.vscode-resource.vscode-cdn.net/Users/vladislavmaydanskiy/.cursor/extensions/openai.chatgpt-26.304.20706-darwin-arm64/webview/#).
- **Featured Work (Home):** бере тільки featured-кейси через getFeaturedCaseStudies(3) (тобто featured: true, сортування по featuredRank, ліміт 3).
- **Work Page:** бере весь caseStudies і далі фільтрує по категорії (All/Content/Web/Systems).

Тобто: **one source of truth**, але **різні правила відбору** для різних сторінок.