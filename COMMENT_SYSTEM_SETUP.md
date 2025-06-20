# Comment System Setup Guide

This guide will help you set up the Giscus comment system for your blog posts.

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It's completely free and provides:
- Comment storage on GitHub Discussions
- Built-in moderation tools
- User authentication via GitHub
- Responsive design
- SEO-friendly comments

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Features** section
4. Check the box for **Discussions**
5. Click **Save**

### 2. Create a Discussion Category

1. Go to the **Discussions** tab in your repository
2. Click **Categories** in the sidebar
3. Click **New category**
4. Set the following:
   - **Category name**: `Comments`
   - **Description**: `Blog post comments and discussions`
   - **Emoji**: 💬 (or any emoji you prefer)
5. Click **Create category**

### 3. Get Repository ID

You need your repository's numeric ID. Here are two ways to get it:

#### Method 1: Using GitHub API
```bash
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO
```

Look for the `"id"` field in the response.

#### Method 2: Using Online Tools
1. Go to https://giscus.app/
2. Enter your repository name
3. The repository ID will be shown automatically

### 4. Get Category ID

1. Go to your repository's Discussions
2. Click on the **Comments** category
3. Look at the URL: `https://github.com/YOUR_USERNAME/YOUR_REPO/discussions/categories/comments`
4. The category ID is usually the last part of the URL or you can find it in the page source

### 5. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Giscus Comment System Configuration
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id_here
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id_here
```

**Example:**
```env
NEXT_PUBLIC_GISCUS_REPO=ravindar/portfolio-v2
NEXT_PUBLIC_GISCUS_REPO_ID=123456789
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOABCDEF
```

### 6. Test the Comment System

1. Start your development server: `npm run dev`
2. Go to any blog post: `http://localhost:3000/blogs/your-blog-slug`
3. Scroll down to see the comment section
4. Try posting a comment (you'll need to authorize with GitHub)

## Features

### Bilingual Support
- The comment section UI is available in both English and Telugu
- Comments themselves can be written in any language
- Language switching works seamlessly

### Design Integration
- Follows your project's design guidelines
- Uses your primary brand color `#0056D2`
- Responsive design for all devices
- Loading states and error handling

### Moderation
- Comments are stored in GitHub Discussions
- Use GitHub's built-in moderation tools
- Can pin important comments
- Can lock discussions if needed

## Troubleshooting

### Comments Not Loading
1. Check that all environment variables are set correctly
2. Verify that GitHub Discussions is enabled
3. Ensure the repository and category IDs are correct
4. Check browser console for any errors

### Authorization Issues
1. Make sure you're logged into GitHub
2. Check that the repository is public (or you have access)
3. Try refreshing the page

### Styling Issues
1. Check that the comment section component is properly imported
2. Verify that your CSS is loading correctly
3. Check for any conflicting styles

## Security Considerations

- Comments are stored on GitHub, so they follow GitHub's security practices
- User authentication is handled by GitHub OAuth
- No sensitive data is stored locally
- Comments are publicly visible (as they're in GitHub Discussions)

## Performance

- Giscus is lightweight and doesn't impact page load times significantly
- Comments are loaded asynchronously
- No additional database queries needed
- Minimal impact on your site's performance

## Support

If you encounter issues:
1. Check the [Giscus documentation](https://giscus.app/)
2. Verify your GitHub repository settings
3. Check the browser console for error messages
4. Ensure all environment variables are correctly set

## Future Enhancements

The comment system can be enhanced with:
- Comment analytics and engagement tracking
- Email notifications for new comments
- Advanced moderation features
- Comment search functionality
- Comment reactions and voting 