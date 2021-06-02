# Bookmarkable - JavaScript Version

[![Netlify Status](https://api.netlify.com/api/v1/badges/739282f0-290e-407e-b76f-87def83e37ec/deploy-status)](https://app.netlify.com/sites/bookmarkable/deploys)

## Overview
This is a social bookmarking application to help people organize learning resources. It is a social/personal app where users can post useful resources in an open space page and other users can review all the recommended read/tutorials/other resources with user comments. If they wish to keep the post private for their own personal use, they can save the link and comments to their own personal page.

## Motivation
I have personally come across many good resources to learn JavaScript through simple google searches or friends' recommendations on social media. However, it is hard to keep track of all the different resources available. The websites saved in my bookmark folder keep growing and finding items from this list is growing more difficult with it. If I had an app to keep track of the resources by category for me, that would help me tremendously. The social features of this app will benefit other users as well.
## User Stories

<h3>Authentication</h3>
<ul>
  <li>As a user, who is logged out, I should see the authentication button</li>
  <li>As a user, who is logged out, I should be able to click on an authentication button and login via google.</li>
  <li>As a user, who is logged in, I should see the signout button</li>
  <li>As a user, who is logged in, I should be able to see the Open Space and Personal components.</li>
</ul>
<h3>CREATE Bookmarks</h3>
<ul>
  <li>As an authenticated user, I should be able to fill out a form to add a new bookmark on Open Space</li>
  <li>As an authenticated user, when I submit a new Open Space bookmark, a new bookmark should be created in firebase and should now show in Open Space component.</li>
  <li>As an authenticated user, I should be able to fill out a form to add a new bookmark on Personal Bookmark</li>
  <li>As an authenticated user, when I submit a new personal bookmark, a new bookmark should be created in firebase and should now show in Personal component.</li>
</ul>
<h3>READ Bookmarks</h3>
<ul>
  <li>As an unauthenticated user, I should be able to see a card with 'get random resource' button on main page</li>
  <li>As an authenticated user, I should be able to see the Open Space component with all the resources that I and everybody else created.</li>
  <li>As an authenticated user, I should be able to see the Personal component with all the resources I created.</li>
  <li>As an authenticated user, I should not be able to see Personal component with resources that were created by another user.</li>
</ul>
<h3>UPDATE Bookmarks</h3>
<ul>
  <li>As an authenticated user, I should be able to see an edit button on cards on resources that I created. (Open Space)</li>
  <li>As an authenticated user, I should be able to see an edit button all the cards that I created. (Personal)</li>
  <li>As an authenticated user, when I click the edit button I should see a form with the resource information pre-populated. (Both Open Space and Personal)</li>
  <li>As an authenticated user, I should be able to edit the information in the form and hit the submit button.</li>
  <li>As an authenticated user, when I submit the edit form firebase should be updated and the component (Open Space & Personal) should update.</li>
</ul>
<h3>DELETE Bookmarks</h3>
<ul>
  <li>As an authenticated user, I should be able to see a delete button on cards on resources that I created. (Open Space)</li>
  <li>As an authenticated user, I should be able to see a delete button all the cards that I created. (Personal)</li>
  <li>As an authenticated user, when I click a delete button, that resource should be removed from firebase and the component (Open Space & Personal) should update.</li>
</ul>
<h3>Other Items</h3>
<ul>
  <li>As an authenticated user, I should be able to create a new category for Personal component.</li>
  <li>As an authenticated user, I should be able to see "bookmark" button on some sorts on Open Space resource card that enables me to save the resource into my Personal component.</li>
  <li>As authenticated user, I should be able to search resources by each category.</li>
   <li>As an admin, I should be able to delete any public post that is not appropriate for users.</li>
    <li>As an authenticated user, I should be able to search Open Space/Personal resources with words not just by categories.</li>
</ul>
<h3>STRETCH - Admin</h3>
<ul>
  <li>As an admin, I should be able to add category to Open Space.</li>
  <li>As an admin, I should be able to see Admin page with a list of all the users using Bookmarkable.</li>
  <li>As an admin, I should be able to see Admin page with a list of reported posts.</li>
</ul>
<h3>STRETCH - Unauthenticated users</h3>
<ul>
  <li>As an unauthenticated user, I should be able to see 4 random resources finders on the main page.<ol><li>Good Read</li><li>Good Tutorial</li><li>Other Good Resources</li><li>Did you know?</li></ol></li>
</ul>
<h3>STRETCH - Authenticated users</h3>
<ul>
  <li>As an authenticated user, I should be be able to see Like button on Open Space posts.</li>
  <li>As an authenticated user, I should be able to see how many Likes the post has.</li>
  <li>As an authenticated user, I should be able to toggle Like/Unlike Open Space recommendations.</li>
  <li>As an authenticated user, I should be able to report any inappropriate Open Space posts.</li>
  <li>As an authenticated user, I should be able to see "reviewed" button to notify me if I have already reviewed the resources.</li>
</ul>
<h3>STRETCH - Other Items</h3>
<ul>
  <li>All the posted links in Open Space/Personal to be converted into thumbnails (link preview) to be more appealing</li>
</ul>

## Wireframes
[Link to Wireframe](https://www.canva.com/design/DAEeSWGLbBs/share/preview?token=xad8ziga5nxnVMmXKoaIkQ&role=EDITOR&utm_content=DAEeSWGLbBs&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)

## Personal Biosite
[Chie Stroud's Portfolio Site](https://chiestroud.com/)

## Loom Video
https://www.loom.com/share/b5baf7b3f5584c129f540ed1c2e568a4n
## Sample JSON
[Sample JSON File](https://github.com/chiestroud/Bookmarkable/tree/cs-planning/src/sample_json)
## ERD
[Link to ERD](https://dbdiagram.io/d/607a3d63ef1b8f6b3dd5aefd)

## Flowchart
[Link to Flowchart](https://docs.google.com/presentation/d/1riWBSH_KAwCb5nFBl29pyfBjhj1CzDOvJe4PO-HkNdA/edit?usp=sharing)
