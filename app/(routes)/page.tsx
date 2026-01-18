import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          color: '#fff',
          margin: '0 0 1rem',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          Dobrodošli na Coolinariku
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.9)',
          margin: '0 0 2rem',
          lineHeight: 1.6
        }}>
          Otkrijte tisuće ukusnih recepata za svaku priliku
        </p>
        <Link 
          href="/recepti" 
          style={{
            display: 'inline-block',
            backgroundColor: '#fce201',
            color: '#141313',
            fontSize: '1.125rem',
            fontWeight: 700,
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}
        >
          Pregledaj recepte
        </Link>
      </div>
    </main>
  );
}
