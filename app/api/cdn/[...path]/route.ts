import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * GET /api/cdn/*
 * Fake CDN route that serves static files from /public/cdn/ directory
 * Simulates CDN behavior with cache headers
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const filePath = resolvedParams.path.join('/');

        // Security: prevent directory traversal
        if (filePath.includes('..') || filePath.includes('../')) {
            return NextResponse.json(
                { error: 'Invalid path' },
                { status: 400 }
            );
        }

        // Construct full path to public/cdn/ directory
        const publicDir = path.join(process.cwd(), 'public', 'cdn');
        const fullPath = path.join(publicDir, filePath);

        // Check if file exists
        try {
            await fs.access(fullPath);
        } catch {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            );
        }

        // Read file
        const fileBuffer = await fs.readFile(fullPath);

        // Determine content type based on file extension
        const ext = path.extname(fullPath).toLowerCase();
        let contentType = 'application/octet-stream';

        switch (ext) {
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.webp':
                contentType = 'image/webp';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
        }

        // CDN cache headers (simulate CDN behavior)
        const headers = new Headers();
        headers.set('Content-Type', contentType);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year cache
        headers.set('CDN-Cache-Status', 'HIT'); // Simulate CDN cache hit
        headers.set('X-CDN-Provider', 'FakeCDN-Simulation');

        return new NextResponse(fileBuffer, {
            status: 200,
            headers
        });

    } catch (error) {
        console.error('CDN Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}