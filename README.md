# filter-customizer
Filter-customizer can compile your own filters lists using popular filters lists that are released as an open-source project and managed by Git.

You can accelerate your web browsing speed by selecting websites and language groups that you want.

## Setup
TO DO with GitHub Action workflow.

## Configure
You can configure your GitHub Actions workflow to compile your own filters lists as you want.

The compiler read `/config.json` in your GitHub repository to compile your own filters lists.

- `FiltersLists` (`Array<string>`): The popular filters lists used as original sources.
- `Localization.LocaleFiltersLists` (`Array<string>`) *[Optional]*: Every filters related to all mentioned domains in selected language-specific filters list will be added into your own filters list even if the the domains exist in another filters list.
- `Localization.Domains` (`Object`) *[Optional]*: Enable domain classification/invalidation feature. If the property does not exist, it will be disabled.
- `Localization.Domains.Include` (`Array<string>`) *[Optional]*: Regardless of that `Localization.LocaleFiltersLists` is configured, every filters related to the domains will be added into your own filters list. Regular expression is supported.
- `Localization.Domains.Exclude` (`Array<string>`) *[Optional]*: Regardless of that `Localization.LocaleFiltersLists` and `Localization.Domains.Include` are configured, every filters related to the domains will be removed and excluded into your own filters list. Regular expression is supported.
- `Compiler.DestinationLocation` (`string`) *[Optional]*: The directory location used when the compiler returns outputs.
- `Compiler.MemoryDirectoryLocation` (`string`) *[Optional]*: The compiler uses this directory as a temporary directory. If it is used in a self-hosted GitHub runner and the directory is [tmpfs](https://en.wikipedia.org/wiki/Tmpfs), enabling this option will help extend lifetime of your SSD. If this option is not configured, the compiler uses value of `os.tmpdir()` as a temporary directory.
- `Compiler.Git.SearchHistory` (`Object`) *[Optional]*: Enable searching Git history feature. If the property does not exist, it will be disabled. It will follow Git commit history to get filters that does not contain a domain related to the domain.
- `Compiler.Git.SearchHistory.IgnoreCommitMessage` (`bool`) *[Optional]*: Ignore Git commit message to avoid wrong output because of  following wrong commit message.
- `Compiler.Header` (`string`) *[Optional]*: Add header into your custom own filters list by setting its file location.
- `Deactivation.AdGuardJSAPI` (`bool`) *[Optional]*: Deactivate AdGuard general javascript API forcibly, regardless of whether AdGuard filters lists are included as original sources. It will destory javascript filters using the AdGuard general javascript API, and the result will not occur as expected.
- `Deactivation.JSFilters` (`bool`) *[Optional]*: Deactivate javascript filters. It will destory javascript filters, and the result will not occur as expected.

The above properties can be included in an array to compile plural filters lists.