import type { ResourceEntry } from './ResourceEntry';

export interface TrashResource extends ResourceEntry {
    /** Путь к ресурсу до перемещения в Корзину. */
    origin_path: string;

    /** ? */
    deleted: string;
}
