// types.ts

export interface User {
  id: number;
  username: string;
  email: string;
  active: number;
  logged_out: string;
  display_picture_path: string | null;
  created_at: string;
  updated_at: string;
}

export default interface UserListResponse {
  users: {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
