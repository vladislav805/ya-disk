import type { Sort } from '../typings';

export interface RequestResourceOptions {
    fields?: string;
    limit?: number;
    offset?: number;
    preview_crop?: boolean;
    preview_size?: string;
    sort?: Sort;
}
