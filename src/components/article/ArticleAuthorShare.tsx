"use client";

type ArticleAuthorShareProps = {
  author?: string;
  authorAvatar?: string;
  bio?: string;
};

function buildBio(author: string) {
  return `${author} काठमाडौँमा आधारित पत्रकार हुन्। उनी रोजगार, नीति, समाज र समसामयिक विषयमा लेख्छन्। थप जानकारीका लागि सम्पर्क गर्नुहोस्।`;
}

export function ArticleAuthorShare({
  author,
  authorAvatar,
  bio,
}: ArticleAuthorShareProps) {
  const name = author || "सम्पादकीय टोली";

  return (
    <div className="article-byline-box">
      <aside className="article-author-card" aria-label="लेखक">
        {authorAvatar ? (
          <img
            className="article-author-card__avatar"
            src={authorAvatar}
            alt=""
            width={72}
            height={72}
          />
        ) : (
          <span className="article-author-card__avatar article-author-card__avatar--empty" />
        )}

        <div className="article-author-card__copy">
          <p className="article-author-card__label">लेखक</p>
          <h3 className="article-author-card__name">{name}</h3>
          <p className="article-author-card__bio">{bio || buildBio(name)}</p>
        </div>
      </aside>
    </div>
  );
}
