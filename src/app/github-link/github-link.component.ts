import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'github-link',
  styles: [`
  .githubLink {
    text-decoration: none;
  }
  .githubLink img {
    width: 36px;
  }
  `],
  template: `
  <a
    class="githubLink {{className}}"
    [href]="href(username, repo)"
  >
    <img alt="Github mark" src="/assets/github-icon.svg" />
  </a>
  `,
})
export class GithubLinkComponent implements OnInit {
  @Input() className = '';
  @Input() username = 'unsplash';
  @Input() repo = 'react-trend';
  // githubIcon = githubIcon;
  constructor() { }

  href(username, repo) {
    return `https://github.com/${username}/${repo}`;
  }

  ngOnInit() {
  }

}
