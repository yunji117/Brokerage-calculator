// pages/index.js
import Calculator from '../components/Calculator';
import SeoStructuredData from '../components/SeoStructuredData';

export default function Home() {
  return (
    <>
      <SeoStructuredData />
      <Calculator />
    </>
  );
}