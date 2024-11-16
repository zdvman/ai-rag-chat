// src/lib/parsing.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { redis } from '@/lib/redis';
import { ragChat } from '@/lib/rag-chat';

/**
 * Fetch all links from a given domain.
 * @param domain - The domain to crawl.
 * @returns An array of unique links.
 */
async function fetchLinksFromDomain(domain: string): Promise<string[]> {
  const links = new Set<string>();
  try {
    const response = await axios.get(domain);
    const $ = cheerio.load(response.data);

    $('a[href]').each((_index, element) => {
      const href = $(element).attr('href');
      // Resolve relative URLs and ensure valid HTTP/HTTPS links
      if (href && (href.startsWith('http') || href.startsWith('/'))) {
        const fullUrl = href.startsWith('http')
          ? href
          : new URL(href, domain).href;
        links.add(fullUrl);
      }
    });
  } catch (error) {
    console.error(`Error fetching links from domain: ${domain}`, error);
  }

  return Array.from(links);
}

/**
 * Process a list of links, adding them to the vector database if not already indexed.
 * @param links - The list of links to process.
 */
async function processLinks(links: string[]): Promise<void> {
  for (const link of links) {
    const isAlreadyIndexed = await redis.sismember('indexed-urls', link);

    if (isAlreadyIndexed) {
      console.log(`Skipping already indexed URL: ${link}`);
      continue;
    }

    try {
      console.log(`Processing URL: ${link}`);

      // Add the link's content to the vector database
      await ragChat.context.add({
        type: 'html',
        source: link,
        config: { chunkOverlap: 50, chunkSize: 200 },
      });

      // Mark the link as indexed
      await redis.sadd('indexed-urls', link);

      console.log(`Successfully indexed URL: ${link}`);
    } catch (error) {
      console.error(`Failed to process URL: ${link}`, error);
    }
  }
}

/**
 * Main function to fetch and process all links from a domain.
 * @param domain - The domain to process.
 */
export async function processDomain(domain: string): Promise<void> {
  const links = await fetchLinksFromDomain(domain);
  console.log(`Found ${links.length} links. Starting processing...`);
  await processLinks(links);
}

// Start processing the domain
// processDomain('https://example.com')
//   .then(() => console.log('Domain processing completed!'))
//   .catch((error) => console.error('Error during domain processing:', error));
