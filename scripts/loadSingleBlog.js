async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get("file");

    if (!file) {
        document.getElementById("blog-content").innerHTML = "<p>Blog post not found.</p>";
        return;
    }

    const blogContainer = document.getElementById("blog-content");
    const converter = new showdown.Converter();

    try {
        const response = await fetch(`/blogs/${file}`);
        if (response.ok) {
            const markdownText = await response.text();
            const htmlContent = converter.makeHtml(markdownText);
            blogContainer.innerHTML = htmlContent;
        } else {
            blogContainer.innerHTML = "<p>Could not load blog content.</p>";
        }
    } catch (error) {
        blogContainer.innerHTML = "<p>Error loading blog content.</p>";
        console.error(error);
    }
}

// Load blog content on page load
document.addEventListener("DOMContentLoaded", loadBlogPost);