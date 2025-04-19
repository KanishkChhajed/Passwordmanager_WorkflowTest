// require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch GitHub user data and generate README
app.get("/api/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch user data
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const user = userResponse.data;

    // Fetch user's repositories
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = reposResponse.data;

    // Extract tech stack from repositories
    const languages = new Set();
    repos.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });
    const techStack = Array.from(languages).join(", ");

    // Generate README content
    const readme = `# Hi there! 👋 I'm ${user.name || user.login}

Welcome to my GitHub profile! I am passionate about programming and love contributing to open-source projects.

## 🚀 About Me
- 🔭 I’m currently working on: ${"No repositories found"}
- 🌱 I’m currently learning: [Tech Stack/Frameworks you're learning]
- 👯 I’m looking to collaborate on: [Open Source Projects or something else]

## 🛠️ My Tech Stack
- 💻 **Languages**: ${techStack || "Not specified"}
- 🌐 **Frameworks**: [React, Django, Flask, etc.]
- 🛢️ **Databases**: [MongoDB, MySQL, PostgreSQL, etc.]
- ⚙️ **Tools**: [Git, Docker, Kubernetes, etc.]
- 🖥️ **Operating Systems**: [Linux, Windows, MacOS]

## 🔗 Connect with me
- [![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue)]()
- [![Twitter](https://img.shields.io/badge/-Twitter-blue)]()
- [![Email](https://img.shields.io/badge/-Email-red)]()

## 📊 GitHub Stats
![Your Name's GitHub stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical)

## 🏆 GitHub Trophies
[![trophy](https://github-profile-trophy.vercel.app/?username=${username}&theme=darkhub)](https://github.com/ryo-ma/github-profile-trophy)

## 🔥 Streak Stats
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical)

## 💼 Featured Projects
${repos
  .slice(0, 3)
  .map(
    (repo) =>
      `- [${repo.name}](${repo.html_url}): ${repo.description || "No description"}`
  )
  .join("\n")}

## ✍️ Recent Blog Posts
- [Blog Post Title 1]()
- [Blog Post Title 2]()
- [Blog Post Title 3]()

Feel free to reach out and connect with me!
`;

    res.json({ readme });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Route to fetch repository data and generate README
app.get("/api/repo/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;

  try {
    console.log("Fetching repository data...");
    console.log("Repository Owner:", owner);
    console.log("Repository Name:", repo);

    // Fetch repository data
    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${"YOUR_GITHUB_TOKEN"}`, // Add your token here
        },
      }
    );
    console.log(repoResponse)
    const repoData = repoResponse.data;

    // Fetch repository contributors
    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${"YOUR_GITHUB_TOKEN"}`,
        },
      }
    );
    const contributors = contributorsResponse.data;

    // Access every contributor
    contributors.forEach(contributor => {
      console.log(`${contributor.login} has made ${contributor.contributions} contributions.`);
    });

    // Fetch repository languages (tech stack)
    const languagesResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${"YOUR_GITHUB_TOKEN"}`,
        },
      }
    );
    const techStack = Object.keys(languagesResponse.data).join(", ");

    // Generate README content
    const readme = `# ${repoData.name}

${repoData.description || "No description provided."}

## 🚀 About the Project
- **Owner**: [${owner}](${repoData.owner.html_url})
- **Stars**: ${repoData.stargazers_count}
- **Forks**: ${repoData.forks_count}
- **Issues**: ${repoData.open_issues_count}
- **License**: ${repoData.license?.name || "No license"}

## 🛠️ Tech Stack
- **Languages**: ${techStack || "Not specified"}

## 👥 Contributors
${contributors
  .map(
    (contributor) =>
      `- [${contributor.login}](${contributor.html_url})`
  )
  .join("\n")}

## 📊 GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api/pin/?username=${owner}&repo=${repo})

## 🔥 Streak Stats
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${owner}&repo=${repo})

## 📄 License
This project is licensed under the ${repoData.license?.name || "No license"} license.

---

Feel free to contribute to this project!
`;

    res.json({ readme });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to fetch repository data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});