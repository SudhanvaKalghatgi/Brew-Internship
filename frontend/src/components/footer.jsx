export function Footer() {
    return (
        <footer className="bg-background border-t border-border/50 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Brew. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <p className="text-muted-foreground">Designed and developed by <span className="text-foreground font-medium">Sudhanva Kalghatgi</span></p>
                </div>
            </div>
        </footer>
    );
}
