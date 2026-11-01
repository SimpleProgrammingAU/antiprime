# Releasing

Releases are published to npm by the [release workflow](../.github/workflows/release.yml) when a GitHub Release is published. It uses npm trusted publishing, so no npm token is stored anywhere, and each release gets a provenance attestation.

## One-time setup

### npmjs.com

1. Open the [antiprime package settings](https://www.npmjs.com/package/antiprime/access).
2. Under **Trusted Publisher**, choose **GitHub Actions** and enter:
   - Organization or user: `SimpleProgrammingAU`
   - Repository: `antiprime`
   - Workflow filename: `release.yml`
   - Environment name: `npm`
3. Under **Publishing access**, choose **Require two-factor authentication and disallow tokens**.

### GitHub

1. In **Settings → Environments**, create an environment called `npm`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.

## Each release

1. In a pull request, update `version` in `package.json` and add a section to `CHANGELOG.md`.
2. Merge the pull request once CI passes.
3. [Draft a new release](https://github.com/SimpleProgrammingAU/antiprime/releases/new) with a new tag `vX.Y.Z` matching `package.json`, and publish it.
4. The release workflow checks the tag, runs every check, publishes to npm and deploys the API docs.

## After 2.0.0 only

Once 2.0.0 is on npm, deprecate the 1.x releases:

```sh
npm deprecate antiprime@"<2.0.0" "Upgrade to 2.x: 1.x has known correctness bugs"
```
