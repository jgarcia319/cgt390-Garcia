import Link from "next/link";

type EmptyStateProps = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function EmptyState({ title, body, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{body}</p>
      <Link href={ctaHref} className="button primary">
        {ctaLabel}
      </Link>
    </section>
  );
}
