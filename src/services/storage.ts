class StorageService {
    private readonly keyFavorites = "";//QUE GUARDAR?

    private write(value: number[]): void {
        localStorage.setItem(this.keyFavorites, JSON.stringify(value));
    }

    getFavorites(): number[] {
        const raw = localStorage.getItem(this.keyFavorites);
        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];

            return parsed.filter((value): value is number => Number.isFinite(value));
        } catch {
            return [];
        }
    }

    isFavorite(id: number): boolean {
        return this.getFavorites().includes(id);
    }

    addFavorite(id: number): void {
        const list = new Set(this.getFavorites());
        list.add(id);
        this.write([...list]);
    }

    removeFavorite(id: number): void {
        const list = new Set(this.getFavorites());
        list.delete(id);
        this.write([...list]);
    }

    toggleFavorite(id: number): boolean {
        if (this.isFavorite(id)) {
            this.removeFavorite(id);
            return false;
        }

        this.addFavorite(id);
        return true;
    }
}

const storage = new StorageService();
export default storage;