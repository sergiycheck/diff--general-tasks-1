import { DNSResolver } from "./lru-cache-config";

(async function main() {
  const dnsResolver = new DNSResolver({
    cacheOptions: {
      max: 100,
      ttl: 1000 * 60 * 60, // 1 hour
    },
  });

  const ipv4 = await dnsResolver.resolve("google.com");

  console.log(ipv4);

  const result = await dnsResolver.resolve("dns.google");

  console.log(result);
})();
