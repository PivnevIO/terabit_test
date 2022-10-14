export interface ResponseAPI {
  total_pages: number;
  per_page:    number;
  support:     Support;
  total:       number;
  page:        number;
  data:        Array<Users>;
}

export interface SingleUser {
  data:       Users;
  support:    Support;
}

export interface Users {
  id?:          number;
  email:        string;
  first_name:   string;
  last_name:    string;
  avatar?:      string;
}

export interface Support {
  url:          string;
  text:         string;
}