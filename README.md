# parsec 🌌

[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/parsec) [![GitHub release (latest by date)][releases]][releases-page] [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

Tiny body parser for Deno. Port of the [milliparsec](https://github.com/talentlessguy/milliparsec) library.

## Features

- supports JSON and urlencoded body parsing
- parses only when `Content-Type` header matches the parser's type
- custom callback function

[releases]: https://img.shields.io/github/v/release/deno-libs/parsec?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/parsec?color=yellow&label=Documentation&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/parsec/mod.ts
[releases-page]: https://github.com/deno-libs/parsec/releases
[gh-actions-img]: https://img.shields.io/github/actions/workflow/status/deno-libs/parsec/main.yml?branch=master&style=flat-square
[codecov]: https://codecov.io/gh/deno-libs/parsec
[github-actions]: https://github.com/deno-libs/parsec/actions
[codecov-badge]: https://img.shields.io/codecov/c/gh/deno-libs/parsec?style=flat-square
