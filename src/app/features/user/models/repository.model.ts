export class Repository {
  id:number;
  node_id:string;
  name:string;
  full_name:string;
  html_url:string;
  description:string;
  open_issues:number;
  forks:number;
  watchers:number;
  private:boolean;
  constructor(options: any = {}) {
      this.id = options.id || null;
      this.node_id = options.node_id || "";
      this.name = options.name || "";
      this.full_name = options.full_name || "";
      this.html_url = options.html_url || "";
      this.description = options.description || "";
      this.forks = options.forks || 0;
      this.watchers = options.watchers || 0;
      this.open_issues = options.open_issues || 0;
      this.private = options.private || false;

      
  }
}
