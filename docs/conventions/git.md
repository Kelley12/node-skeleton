# VersaBuilt "Git Gud" Git Guidelines

VersaBuilt uses git for source control. This document defines how git should be used
and managed within VersaBuitl.

- [VersaBuilt "Git Gud" Git Guidelines](#versabuilt-git-gud-git-guidelines)
- [VB Branch Model](#vb-branch-model)
    - [Two main branches:](#two-main-branches)
    - [Other branches](#other-branches)
    - [Feature branches](#feature-branches)
    - [Release branches](#release-branches)
- [Remotes](#remotes)
- [Commits](#commits)
- [Tags](#tags)

# VB Branch Model

VersaBuilt's branch model is inspired by, but does not strictly adhere to, this [post](http://nvie.com/posts/a-successful-git-branching-model/)

Branches must adhere to the following rules:

- Must be all lower case
- Must be prefixed by one of `bug-`, `feature-`, `release-`, `task-`, `fork-`, or `misc-`
- Each word must be seperated by a dash (`-`)
- Should exactly match the words from the issue tile where the item is being tracked

**Example:**
```bash
git checkout -b feature-dark-mode
```

## Two main branches:

  - `master` - Strictly stable, production ready and deployable
  - `develop` - Unstable, where development for next release occurs

## Other branches

- `feature-` For all new features.
- `task-` For modifications to existing features.
- `bug-` Branches for fixing a known bug (Including spelling fixes)
- `fork-` Branches for maintaining a custom version of code based on special needs.
THIS SHOULD BE AVOIDED.
- `release-` Release branches. Branches for an upcoming release. Isolates the release
from new features added to develop. Should be created in prep for a new release which
will eventually be tagged and merged into master
- `misc-` All other changes. Great for sandbox environments or experimental changes

## Feature branches

When working on a new feature you must branch off of the develop into a new branch prefixed with `feature-`. The branch name should describe the feature you work on. The branch name should be as short as possible but if it needs multiple words separate them with a hyphen - (i.e. `a-new-feature`) Commits on this branch must be related to that feature. Once the feature is complete it should be merged back into the develop branch with `--no-ff`.

Example:

```bash
# From the develop branch (Develop should be checked out)
git checkout -b feature-new-feature

# Make some changes
git commit -m "Made a file"
git commit -m "Integrated new feature"

# Once the feature is complete
git checkout develop
git merge --no-ff new-feature
git push origin develop
```

## Release branches

Once the develop branch has all the features for a new release we create a release branch. Release branches should be stable and feature-complete. Only bugfixes and metadata changes can be added to release branches. A release branch should be prefixed with `release-`. Once a release is done it should be tagged and merged into the master branch with `--no-ff`.

Example:

```bash
# From the develop branch (Develop should be checked out)
git checkout -b release-1.3

# Make some bugfixes, bring the release to stability
git commit -m "Fix a feature"
git commit -m "Spelling fix"

# The release is now solid, The following steps should never be completed without review

# Tag the release
git tag v1.3
git push orgin v1.3 # push the tag

# Add the release to master
git checkout master
git merge --no-ff release-1.3
git push origin master

# Merge any change made back into develop
git checkout develop
git merge --no-ff release-1.3
git push origin develop
```

One exception is new features / fixes for old versions. In which case we branch off the old version tag, create
a new release branch, and use it as a temporary `develop` branch.

# Remotes

The central git remote server should generally be refered to as "origin". All others can have any name you choose.

# Commits

General rule, commit often. Always commit once you have completed whatever change you make. Each commit should generally only do one thing. Never commit a ton of changes at once.

The first line of a commit message should be short (80 chars or less) and describe exactly what changes were made. The lines after the first can contain any relevant information you want

# Merge Requests

All merge requests will be submitted using gitlab.com. Select Merge Request and fill out the form as follows:

- `Title` - Should match branch name with spaces as the delimiter
- `Description` -  Add any notes here, do not use this section to tag reviewers
- `Assignee` - Asign to project lead for final merge
- `Milestone` - All Merge requests should have a target milestone
- `Labels` - Mark as Awaiting Code Review
- Make sure you check the box to `Remove source branch when merge request is accepted.`
- After merge request has been submitted, go to the merge request, tag at least two reviewers
    - Use `@username` to tag users

**Voting for Merge Request:**
- Select merge request to review
- Give the request either a thumbs up or down
    - If down voted leave a comment as to why
- Do not merge until merge request has at minimum 2 upvotes (can include Assignee) and no downvotes

# Tags

All release tags must be prefixed with a v (i.e. `v1.4`). Release tags must be tagged from a release branch when that branch is complete. Tags should generally only be used for tags but if you feel it's appropriate you may use a tag for something else as well so long as it doesn't look like a release tag.
