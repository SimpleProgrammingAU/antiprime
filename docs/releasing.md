# Releasing

Publishing a GitHub Release runs the [release workflow](../.github/workflows/release.yml), which stages the new version on npm and deploys the API docs. A maintainer then approves the staged version on npmjs.com with 2FA, which makes it live. The workflow uses npm trusted publishing, so no npm token is stored anywhere, and each release gets a provenance attestation.

## One-time setup

### npmjs.com

1. Open the [antiprime package settings](https://www.npmjs.com/package/antiprime/access).
2. Under **Trusted Publisher**, choose **GitHub Actions** and enter:
   - Organization or user: `SimpleProgrammingAU`
   - Repository: `antiprime`
   - Workflow filename: `release.yml`
   - Environment name: `npm`
   - Allowed actions: leave the default, `npm stage publish` only. The workflow never publishes directly.
3. Under **Publishing access**, choose **Require two-factor authentication and disallow tokens**.

A new trusted publisher expires unless its first publish succeeds within 2 days, so set it up shortly before the first release. It's tied to `release.yml` and the `npm` environment: if you rename either, update the trusted publisher too, or staging will fail.

### GitHub

1. In **Settings → Environments**, create an environment called `npm`. Under **Deployment branches and tags**, choose **Selected branches and tags** and add a tag rule for `v*`, so only release tags can stage a version.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. In **Settings → Environments → github-pages → Deployment branches and tags**, add a tag rule for `v*`. Releases run from their tag, and Pages only allows deploys from `master` by default.

## Each release

1. In a pull request, update `version` in `package.json` and rename the `Unreleased` section of `CHANGELOG.md` to the new version.
2. Merge the pull request once CI passes.
3. [Draft a new release](https://github.com/SimpleProgrammingAU/antiprime/releases/new) with a new tag `vX.Y.Z` matching `package.json`, and publish it.
4. The release workflow checks the tag, runs every check, stages the version on npm and deploys the API docs.
5. On npmjs.com, open the package's **Staged Packages** tab and approve the version with 2FA. From a terminal, `npm stage list antiprime` shows the stage ID for `npm stage approve <stage-id>`.
