async function getAllEvents(username) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    let page = 1;
    let events = [];

    while (true) {
        const url = `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.length === 0) {
                break;
            }

            events = events.concat(data.filter(event => {
                const eventDate = new Date(event.created_at);
                return eventDate > oneMonthAgo;
            }));

            page++;
        } catch (error) {
            console.error(error);
            return 'Error';
        }
    }

    console.log(events);

    return events;
}

async function getCommits(events) {
    let commitCount = 0;

    const commits = events.filter(event => event.type === 'PushEvent');

    commits.forEach(commit => {
        commitCount += commit.payload.size;
    });

    return commitCount;
}

async function getPullRequests(events) {
    let pullRequestCount = 0;

    const pullRequests = events.filter(event => event.type === 'PullRequestEvent');

    pullRequestCount += pullRequests.length;

    return pullRequestCount;
}

async function getIssues(events) {
    let issueCount = 0;

    const issues = events.filter(event => event.type === 'IssuesEvent' || event.type === 'IssueCommentEvent');

    issueCount += issues.length;

    return issueCount;
}

async function getFollowers(username) {
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.followers;
    } catch (error) {
        console.error(error);
        return 'Error';
    }
}

async function getAllRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return 'Error';
    }
}

async function getTotalStars(repos) {
    let totalStars = 0;
    repos.forEach(repo => {
        totalStars += repo.stargazers_count;
    });

    return totalStars;
}

async function getTotalForks(repos) {
    let totalForks = 0;
    repos.forEach(repo => {
        totalForks += repo.forks_count;
    });

    return totalForks;
}

const username = 'WCY-dt';

const commit = document.querySelector('#commit number');
const pullRequest = document.querySelector('#pr number');
const issue = document.querySelector('#issue number');

getAllEvents(username).then(events => {
    getCommits(events).then(commitCount => {
        commit.textContent = commitCount;
    });

    getPullRequests(events).then(pullRequestCount => {
        pullRequest.textContent = pullRequestCount;
    });

    getIssues(events).then(issueCount => {
        issue.textContent = issueCount;
    });
})

const follower = document.querySelector('#follower number');
getFollowers(username).then(followerCount => {
    follower.textContent = followerCount;
});


const star = document.querySelector('#star number');
const fork = document.querySelector('#fork number');
getAllRepos(username).then(repos => {
    getTotalStars(repos).then(starCount => {
        star.textContent = starCount;
    });

    getTotalForks(repos).then(forkCount => {
        fork.textContent = forkCount;
    });
});


