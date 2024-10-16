async function getAllEvents(username) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    let page = 1;
    let events = [];

    while (page <= 3) {
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

    return events;
}

async function getCommits(events) {
    return events
        .filter(event => event.type === 'PushEvent')
        .reduce((count, event) => count + event.payload.size, 0);
}

async function getPullRequests(events) {
    return events.filter(event => event.type === 'PullRequestEvent').length;
}

async function getIssues(events) {
    return events.filter(event => event.type === 'IssuesEvent' || event.type === 'IssueCommentEvent').length;
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
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

async function getTotalForks(repos) {
    return repos.reduce((total, repo) => total + repo.forks_count, 0);
}

const username = 'WCY-dt';

const commit = document.querySelector('#commit number');
const pullRequest = document.querySelector('#pr number');
const issue = document.querySelector('#issue number');
const follower = document.querySelector('#follower number');
const star = document.querySelector('#star number');
const fork = document.querySelector('#fork number');

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
});

getFollowers(username).then(followerCount => {
    follower.textContent = followerCount;
});

getAllRepos(username).then(repos => {
    getTotalStars(repos).then(starCount => {
        star.textContent = starCount;
    });

    getTotalForks(repos).then(forkCount => {
        fork.textContent = forkCount;
    });
});