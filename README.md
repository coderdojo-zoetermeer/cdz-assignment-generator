# cdz-assignment-generator

Generator for CoderDojo assignments that generates HTML assignments based
on a markdown file.

## Features

- Supports themes for
  - arduino
  - scratch
  - python
- assignments are rendered to HTML
- assignments can be printed from the web-browser and support paging.
- support for reusable blocks that can be included in assignments.
- supports deployment of generated assignments
  using [github pages](https://docs.github.com/en/pages)

## Demo

[Demo](https://coderdojo-zoetermeer.github.io/cdz-assignment-generator/)

[Tutorial](https://coderdojo-zoetermeer.github.io/cdz-assignment-generator/cdz-gen-tutorials/introduction-to-cdz-gen.html)

## Install

Install [NodeJS](https://nodejs.org/en/download)

Run:

```cmd
npm i -g https://github.com/coderdojo-zoetermeer/cdz-assignment-generator.git
```

## Usage

### Setup a new workspace directory

To use the generator, you need a directory that contains a folder named
'opdrachten'

In the opdrachten folder you need to create one or more markdown files.

You can create a new markdown file from a template using the command:

```cmd
cdz-gen gen-assignment -n <name>
```

### View and edit the assignments

Start the generator server to watch changes in the assignment files and
automatically generate/update the HTML files. The server opens a browser that
automatically updates when a file is changed.

To start the server run the command:

```cmd
cdz-gen server
```
