async function loadBlogList() {
    const blogContainer = document.getElementById("blog-container");
    const blogs = [
        { title: "Experiments, Execution, and Driving Business Operations in the Age of GenAI", file: "power_of_iteration.md" },
        { title: "Product Management for Platform Products: Crafting a Two-Layer PRD", file: "platform_prds.md" }
    ]; // Add more blog entries here as needed

    // Create a list element to contain blog links
    const blogList = document.createElement("ul");
    blogList.classList.add("blog-list");

    blogs.forEach(blog => {
        const blogLink = document.createElement("a");
        blogLink.href = `blog.html?file=${blog.file}`; // Links to blog.html with file as query parameter
        blogLink.textContent = blog.title;
        blogLink.classList.add("blog-link");

        const listItem = document.createElement("li");
        listItem.appendChild(blogLink);

        blogList.appendChild(listItem);
    });

    blogContainer.appendChild(blogList);
}

// Load the blog list on page load
document.addEventListener("DOMContentLoaded", loadBlogList);