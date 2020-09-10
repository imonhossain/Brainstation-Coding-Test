export class User {
  avatar_url:string;
  events_url:string;
  followers_url:string;
  following_url:string;
  gists_url:string;
  gravatar_id:string;
  html_url:string;
  id:number;
  login:string;
  node_id:string;
  organizations_url:string;
  received_events_url:string;
  repos_url:string;
  site_admin:boolean;
  starred_url:string;
  subscriptions_url:string;
  type:string;
  url:string;
  name:string;
  blog:string;
  score:number;
  constructor(options: any = {}) {
      this.avatar_url = options.avatar_url || "";
      this.events_url = options.events_url || "";
      this.followers_url = options.followers_url || "";
      this.following_url = options.following_url || "";
      this.gists_url = options.gists_url || "";
      this.gravatar_id = options.gravatar_id || "";
      this.html_url = options.html_url || "";
      this.id = options.id || null;
      this.login = options.login || "";
      this.node_id = options.node_id || "";
      this.organizations_url = options.organizations_url || "";
      this.received_events_url = options.received_events_url || "";
      this.repos_url = options.repos_url || "";
      this.site_admin = options.site_admin || false;
      this.starred_url = options.starred_url || "";
      this.subscriptions_url = options.subscriptions_url || "";
      this.type = options.type || "";
      this.name = options.name || "";
      this.blog = options.blog || "";
      this.score = options.score || 0;
  }
}
