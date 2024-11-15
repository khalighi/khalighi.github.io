async function loadBlogList() {
    const blogContainer = document.getElementById("blog-container");
    const blogs = [
        { title: " The Age of Foundation Models: Navigating the Future of Work and Creativity", file: "future_is_creative.md", year: 2024 },
        { title: "Experiments, Execution, and Driving Business Operations in the Age of GenAI", file: "power_of_iteration.md", year: 2024 },
        { title: "Product Management for Platform Products: Crafting a Two-Layer PRD", file: "platform_prds.md", year: 2024 },
        { title: "Doing No Harm: The Imperative for an AI Practitioner’s Ethical Code", file: "do_no_harm.md", year: 2024 }, 
        { title: "The Art of Assistance: LLM vs ADAS", file: "art_of_assistance.md", year: 2023 }
    ]; // Add more blog entries as needed

     // Group blogs by year
     const blogsByYear = blogs.reduce((acc, blog) => {
        acc[blog.year] = acc[blog.year] || [];
        acc[blog.year].push(blog);
        return acc;
    }, {});

    // Create and append the grouped blog list to the container
    Object.keys(blogsByYear).sort((a, b) => b - a).forEach(year => {
        // Create year subheader
        const yearHeader = document.createElement("h2");
        yearHeader.textContent = year;
        yearHeader.classList.add("year-header");
        blogContainer.appendChild(yearHeader);

        // Create list of blogs for each year
        const blogList = document.createElement("ul");
        blogList.classList.add("blog-list");

        blogsByYear[year].forEach(blog => {
            // Create link for each blog post
            const blogLink = document.createElement("a");
            blogLink.href = `blog.html?file=${blog.file}`;
            blogLink.classList.add("blog-link");

            const title = document.createElement("h3");
            title.textContent = blog.title;
            blogLink.appendChild(title);

            const listItem = document.createElement("li");
            listItem.appendChild(blogLink);
            blogList.appendChild(listItem);
        });

        // Append the list of blogs under the year header
        blogContainer.appendChild(blogList);
    });
}

document.addEventListener("DOMContentLoaded", loadBlogList);