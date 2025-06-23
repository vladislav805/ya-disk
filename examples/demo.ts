import { writeFile } from 'node:fs/promises';

import type { Resource } from '../src/typings';
import { YaDiskClient } from '../src/client';

const RESULT_JSON = '../result.json';

(async() => {
    let client: YaDiskClient;
    try {
        client = new YaDiskClient();
    } catch {
        const authToken = YaDiskClient.getAuthorizeUrl({ client_id: '123456' });
        console.log(`Token not specified. Get it and pass to YA_DISK_TOKEN:\n${authToken}\n^ replace 123465 with your client_id`);
        return;
    }

    const files: Resource[] = [];

    while (true) {
        const part = await client.getFiles({
            limit: 1000,
            offset: files.length,
        });

        if (part.items.length === 0) break;

        files.push(...part.items);

        console.log(`Found: ${files.length}`)
    }


    await writeFile(RESULT_JSON, JSON.stringify(files, null, 4), 'utf-8');
})();
