export const lunaLolaCoinDescription = {
  // Basic Token Information
  name: "LunaLola",
  symbol: "LOLA",
  tagline: "The Moon's Favorite Meme Queen 🌙👑",
  
  // Main Description
  description: `LunaLola ($LOLA) is the cosmic meme coin that's taking the crypto universe by storm! 🚀✨

Born from the mystical energy of lunar cycles and the playful spirit of internet culture, LunaLola represents the perfect fusion of celestial magic and meme coin madness. Our adorable mascot, Lola the Moon Cat, guides holders through the crypto cosmos with her sparkling personality and diamond paws.

🌙 **What Makes LunaLola Special:**
• Community-driven with a passionate "Lola Squad" 
• Deflationary tokenomics with automatic burns on every transaction
• Monthly "Lunar Rewards" distributed during full moons
• NFT collection featuring exclusive Lola artwork
• Charity partnerships supporting animal shelters worldwide
• Gaming integration with "Lola's Lunar Adventure" mobile game

💎 **The Lola Promise:**
We're not just another meme coin - we're building a sustainable ecosystem where fun meets functionality. Every transaction helps grow our community treasury, fund charitable causes, and reward our most loyal holders.

🚀 **Join the Lunar Revolution:**
Whether you're a seasoned crypto veteran or a curious newcomer, LunaLola welcomes all space travelers to join our cosmic journey. Together, we'll reach for the stars and beyond!

*Remember: In space, no one can hear you HODL... but they can see your diamond hands! 💎🙌*`,

  // Key Features
  features: [
    {
      title: "🌙 Lunar Rewards System",
      description: "Earn bonus LOLA tokens during every full moon cycle"
    },
    {
      title: "🔥 Auto-Burn Mechanism", 
      description: "2% of every transaction is permanently burned, reducing supply"
    },
    {
      title: "🎮 Gaming Integration",
      description: "Play-to-earn mechanics in our upcoming mobile game"
    },
    {
      title: "🎨 Exclusive NFTs",
      description: "Limited edition Lola artwork and utility NFTs"
    },
    {
      title: "❤️ Charity Focus",
      description: "1% of transactions donated to animal welfare organizations"
    },
    {
      title: "👥 Community Governance",
      description: "LOLA holders vote on major project decisions"
    }
  ],

  // Tokenomics
  tokenomics: {
    totalSupply: "1,000,000,000 LOLA",
    distribution: {
      "Liquidity Pool": "40%",
      "Community Rewards": "25%", 
      "Development": "15%",
      "Marketing": "10%",
      "Team (Locked 2 Years)": "5%",
      "Charity Wallet": "5%"
    },
    transactionTax: {
      "Auto-Burn": "2%",
      "Liquidity": "2%", 
      "Rewards Pool": "2%",
      "Charity": "1%",
      "Development": "1%"
    }
  },

  // Roadmap
  roadmap: [
    {
      phase: "Phase 1: Launch 🚀",
      items: [
        "Token launch on OptikDexGPT",
        "Initial liquidity provision",
        "Community building campaigns",
        "Social media presence establishment"
      ]
    },
    {
      phase: "Phase 2: Growth 🌱", 
      items: [
        "CoinGecko & CoinMarketCap listings",
        "First charity donation milestone",
        "Lola NFT collection drop",
        "Partnership announcements"
      ]
    },
    {
      phase: "Phase 3: Expansion 🌟",
      items: [
        "Mobile game beta release",
        "Cross-chain bridge development",
        "Major exchange listings",
        "Governance token implementation"
      ]
    },
    {
      phase: "Phase 4: Ecosystem 🌌",
      items: [
        "Full game launch with P2E mechanics",
        "Lola merchandise store",
        "DeFi yield farming pools",
        "Metaverse integration"
      ]
    }
  ],

  // Community & Social
  community: {
    telegram: "https://t.me/LunaLolaCoin",
    twitter: "https://twitter.com/LunaLolaCoin", 
    discord: "https://discord.gg/lunalola",
    website: "https://lunalola.space",
    reddit: "https://reddit.com/r/LunaLola"
  },

  // Marketing Hooks
  marketingHooks: [
    "🌙 The only meme coin blessed by lunar energy!",
    "💎 Diamond paws for diamond hands!",
    "🚀 From Earth to Moon, Lola leads the way!",
    "✨ Where memes meet magic in the crypto cosmos!",
    "👑 Join the royal court of meme coin royalty!",
    "🎮 Play, earn, and HODL with Lola!",
    "❤️ Making the world better, one meme at a time!"
  ],

  // Risk Disclaimers
  disclaimers: [
    "LunaLola is a meme coin created for entertainment and community building",
    "Cryptocurrency investments carry significant risk of loss",
    "Please only invest what you can afford to lose",
    "DYOR (Do Your Own Research) before investing",
    "Past performance does not guarantee future results",
    "The team is committed to transparency and regular updates"
  ],

  // Technical Details
  technical: {
    blockchain: "Solana",
    standard: "SPL Token",
    decimals: 9,
    mintAuthority: "Renounced after launch",
    freezeAuthority: "Disabled",
    liquidityLocked: "2 years via trusted escrow",
    auditStatus: "Pending - scheduled with CertiK",
    antiBot: "Enabled with advanced detection algorithms"
  }
};

// Export individual sections for easy access
export const {
  name,
  symbol, 
  tagline,
  description,
  features,
  tokenomics,
  roadmap,
  community,
  marketingHooks,
  disclaimers,
  technical
} = lunaLolaCoinDescription;