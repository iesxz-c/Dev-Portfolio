import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Your-App-Name', // GitHub requires a User-Agent
  };

  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData: GitHubUser = await userResponse.json();

    // Fetch repositories to calculate total stars
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
    });

    let totalStars = 0;
    if (reposResponse.ok) {
      const repos: GitHubRepo[] = await reposResponse.json();
      totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    }

    const stats = {
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      total_stars: totalStars,
    };

    // Since we're using client-side caching, we can set longer cache headers
    // This helps with any server-side caching and reduces API calls
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200', // Cache for 1 hour on server
      },
    });

  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
