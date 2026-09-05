import os
import re

directories = [
    r'c:\Users\Priyanshu\.gemini\antigravity-ide\scratch\math-explorer\frontend\src\pages',
    r'c:\Users\Priyanshu\.gemini\antigravity-ide\scratch\math-explorer\frontend\src\modules',
    r'c:\Users\Priyanshu\.gemini\antigravity-ide\scratch\math-explorer\frontend\src\components'
]

replacements = {
    # Neon gradients to Professional Blues/Slates
    r'from-purple-400 to-pink-500': 'from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400',
    r'from-emerald-400 to-cyan-500': 'from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400',
    r'from-indigo-400 to-purple-500': 'from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400',
    r'from-blue-400 to-indigo-500': 'from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400',
    r'from-amber-400 to-orange-500': 'from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-400',
    
    # Header text colors that might just be text-white
    r'text-white mb-6 tracking-tight': 'text-slate-900 dark:text-white mb-6 tracking-tight',
    r'text-white mb-2': 'text-slate-900 dark:text-white mb-2',
    r'text-slate-300 mb-6': 'text-slate-600 dark:text-slate-300 mb-6',
    r'text-slate-400 mb-12': 'text-slate-600 dark:text-slate-400 mb-12',
    r'text-slate-300 max-w-2xl': 'text-slate-600 dark:text-slate-300 max-w-2xl'
}

for d in directories:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.tsx'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                original_content = content
                for old, new in replacements.items():
                    content = content.replace(old, new)
                
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Updated {f}")
