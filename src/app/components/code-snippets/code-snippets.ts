import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-snippets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-snippets.html',
  styleUrl: './code-snippets.css',
})
export class CodeSnippets {
  snippets = [
    {
      id: 'auth',
      name: 'useAuth.ts',
      language: 'typescript',
      icon: 'fa-brands fa-js',
      color: '#3178C6',
      code: `export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading };
}`
    },
    {
      id: 'pipeline',
      name: 'DataPipeline.py',
      language: 'python',
      icon: 'fa-brands fa-python',
      color: '#3776AB',
      code: `def process_dataset(filepath: str, batch_size: int = 100):
    """Memory-efficient streaming processor for large datasets."""
    with open(filepath, 'r') as file:
        batch = []
        for line in file:
            batch.append(transform_record(line))
            
            if len(batch) >= batch_size:
                yield process_batch(batch)
                batch.clear()
                
        if batch:
            yield process_batch(batch)`
    },
    {
      id: 'button',
      name: 'Button.tsx',
      language: 'typescript',
      icon: 'fa-brands fa-react',
      color: '#61DAFB',
      code: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', isLoading, ...props 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} \${isLoading ? 'loading' : ''}\`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};`
    }
  ];

  activeSnippetId = this.snippets[0].id;

  setActiveSnippet(id: string) {
    this.activeSnippetId = id;
  }
}
