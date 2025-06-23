import { createReadStream } from 'node:fs';
import { request } from 'node:https';

import type { YaDiskClient } from '../client';

/**
 * @param client Instance of YaDiskClient
 * @param path Remote path
 * @param input Local path
 * @returns true if file uploaded
 */
export async function uploadFile(
    client: YaDiskClient,
    path: string,
    input: string,
): Promise<boolean> {
    const { href, method } = await client.getUploadUrl(path);

    if (typeof input === 'string') {
        const fileStream = createReadStream(input);
        const uploadStream = request({ ...new URL(href), method });

        fileStream.pipe(uploadStream);

        return new Promise<boolean>(resolve => {
            fileStream.on('end', () => {
                uploadStream.end();
                resolve(true);
            });
        });
    }

    return false;
}
