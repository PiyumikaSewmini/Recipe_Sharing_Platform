import { User, UserWithPassword } from '../types/user';

class AuthService {
  // Check if user is already in the system
  private async findUser(email: string): Promise<User | null> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user: User) => user.email === email) || null;
  }

  // Register a new user
  async register(username: string, email: string, password: string): Promise<User> {
    const existingUser = await this.findUser(email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create a new user
    const newUser: UserWithPassword = {
      id: Date.now().toString(),
      username,
      email,
      password, 
    };
    
    // Store in localStorage 
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Store current user in session
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  }

  // Login a user
  async login(email: string, password: string): Promise<User> {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]') as UserWithPassword[];
    
    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store current user in session
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  }

  // Logout a user
  async logout(): Promise<void> {
    localStorage.removeItem('currentUser');
  }

  // Get current logged in user
  async getCurrentUser(): Promise<User | null> {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
}

export default new AuthService();