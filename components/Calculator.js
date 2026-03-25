import { useState } from 'react';
import Link from 'next/link';
import styles from './styles/Calculator.module.css';

// 오피스텔과 주택 외 부동산의 거래 유형별 법정 상한 중개보수율(%)
const OFFICE_TEL_MAX_RATE = {
  '매매 또는 교환': 0.5,
  '전세': 0.4,
  '월세': 0.4,
};

const NON_HOUSING_MAX_RATE = {
  '매매 또는 교환': 0.9,
  '전세': 0.9,
  '월세': 0.9,
};

// 주택 거래 금액별 상한 요율과 한도액 반환 함수
function getHousingBrokerageInfo(transactionAmount, transactionType) {
  if (transactionType === '매매 또는 교환') {
    if (transactionAmount < 50000000) return { maxRate: 0.6, capAmount: 250000 };
    if (transactionAmount < 200000000) return { maxRate: 0.5, capAmount: 800000 };
    if (transactionAmount < 900000000) return { maxRate: 0.4, capAmount: null };
    if (transactionAmount < 1200000000) return { maxRate: 0.5, capAmount: null };
    if (transactionAmount < 1500000000) return { maxRate: 0.6, capAmount: null };
    return { maxRate: 0.7, capAmount: null };
  }

  if (transactionAmount < 50000000) return { maxRate: 0.5, capAmount: 200000 };
  if (transactionAmount < 100000000) return { maxRate: 0.4, capAmount: 300000 };
  if (transactionAmount < 600000000) return { maxRate: 0.3, capAmount: null };
  if (transactionAmount < 1200000000) return { maxRate: 0.4, capAmount: null };
  if (transactionAmount < 1500000000) return { maxRate: 0.5, capAmount: null };
  return { maxRate: 0.6, capAmount: null };
}

export default function Calculator() {

  // 상태 관리
  const [propertyType, setPropertyType] = useState('주택');
  const [transactionType, setTransactionType] = useState('매매 또는 교환');
  const [amount, setAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [customRate, setCustomRate] = useState(null);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState({ total: 0, vat: 0, final: 0, transactionAmount: 0, maxRate: 0 });

  // 설명 텍스트
  const descriptionText = {
    '주택': '주택의 부속토지, 주택분양권 포함',
    '오피스텔': '전용면적 85㎡ 이하이며 법령상 요건을 갖춘 오피스텔',
    '주택 외': '상가, 토지, 사무실, 요건을 충족하지 않는 오피스텔 등'
  };

  // 부동산 유형 변경 핸들러
  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    setCustomRate(null);
  };

  // 거래 유형 변경 핸들러
  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    setCustomRate(null);
  };

  // 거래 금액 계산 (월세의 경우)
  function calculateTransactionAmount() {
    if (transactionType === '월세') {
      const depositNum = parseInt(deposit.replace(/,/g, '')) || 0;
      const monthlyRentNum = parseInt(monthlyRent.replace(/,/g, '')) || 0;
      
      // 5천만원 미만 특례 적용
      const baseAmount = depositNum + (monthlyRentNum * 100);
      if (baseAmount < 50000000) {
        return depositNum + (monthlyRentNum * 70);
      }
      return baseAmount;
    }
    
    if (transactionType === '전세') {
      return parseInt(deposit.replace(/,/g, '')) || 0;
    }
    
    return parseInt(amount.replace(/,/g, '')) || 0;
  }

  const transactionAmount = calculateTransactionAmount();
  const housingInfo = propertyType === '주택'
    ? getHousingBrokerageInfo(transactionAmount, transactionType)
    : null;
  const defaultRate = propertyType === '주택'
    ? housingInfo.maxRate
    : propertyType === '오피스텔'
      ? OFFICE_TEL_MAX_RATE[transactionType]
      : NON_HOUSING_MAX_RATE[transactionType];
  const commissionRate = customRate !== null ? customRate : defaultRate;

  // 중개 수수료 계산
  const calculateCommission = () => {
    const currentTransactionAmount = calculateTransactionAmount();
    const brokerageInfo = propertyType === '주택'
      ? getHousingBrokerageInfo(currentTransactionAmount, transactionType)
      : {
          maxRate: propertyType === '오피스텔'
            ? OFFICE_TEL_MAX_RATE[transactionType]
            : NON_HOUSING_MAX_RATE[transactionType],
          capAmount: null,
        };
    
    // 수수료율 적용
    let commission = Math.floor(currentTransactionAmount * (commissionRate / 100));
    
    if (brokerageInfo.capAmount !== null) {
      commission = Math.min(commission, brokerageInfo.capAmount);
    }
    
    // 부가가치세 계산
    const vat = Math.floor(commission * 0.1);
    const finalAmount = commission + vat;
    
    setResult({
      total: commission,
      vat: vat,
      final: finalAmount,
      transactionAmount: currentTransactionAmount,
      maxRate: brokerageInfo.maxRate,
    });
    setCalculated(true);
  };

  // 숫자 포맷팅 (3자리마다 콤마)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 입력값 포맷팅
  const handleAmountChange = (e, setter) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      setter(formatNumber(value));
    }
  };

  // 수수료율 변경
  const handleRateChange = (e) => {
    const value = parseFloat(e.target.value);
    if (e.target.value === '') {
      setCustomRate(null);
      return;
    }

    if (!isNaN(value) && value >= 0) {
      setCustomRate(Math.min(value, defaultRate));
    }
  };

  // 초기화
  const resetCalculator = () => {
    setPropertyType('주택');
    setTransactionType('매매 또는 교환');
    setAmount('');
    setDeposit('');
    setMonthlyRent('');
    setCustomRate(null);
    setCalculated(false);
    setResult({ total: 0, vat: 0, final: 0, transactionAmount: 0, maxRate: 0 });
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.topLinks}>
        <Link href="/">계산기</Link>
        <Link href="/privacy-policy">개인정보처리방침</Link>
        <Link href="/contact">문의</Link>
      </div>

      <h1 className={styles.title}>중개 수수료(복비) 계산기</h1>
      
      {!calculated ? (
        <>
          {/* 부동산 유형 선택 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>부동산 유형</h2>
            <div className={styles.buttonGroup}>
              {['주택', '오피스텔', '주택 외'].map(type => (
                <button
                  key={type}
                  className={`${styles.typeButton} ${propertyType === type ? styles.active : ''}`}
                  onClick={() => handlePropertyTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className={styles.description}>{descriptionText[propertyType]}</p>
          </div>

          {/* 거래 유형 선택 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>거래 유형</h2>
            <div className={styles.buttonGroup}>
              {['매매 또는 교환', '전세', '월세'].map(type => (
                <button
                  key={type}
                  className={`${styles.typeButton} ${transactionType === type ? styles.active : ''}`}
                  onClick={() => handleTransactionTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 입력 필드 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>거래 정보</h2>
            
            {transactionType === '매매 또는 교환' && (
              <div className={styles.inputGroup}>
                <label>거래금액</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e, setAmount)}
                    placeholder="거래금액 입력"
                  />
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            )}
            
            {(transactionType === '전세' || transactionType === '월세') && (
              <div className={styles.inputGroup}>
                <label>보증금</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="text"
                    value={deposit}
                    onChange={(e) => handleAmountChange(e, setDeposit)}
                    placeholder="보증금 입력"
                  />
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            )}
            
            {transactionType === '월세' && (
              <div className={styles.inputGroup}>
                <label>월세</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="text"
                    value={monthlyRent}
                    onChange={(e) => handleAmountChange(e, setMonthlyRent)}
                    placeholder="월세 입력"
                  />
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            )}
            
            <div className={styles.inputGroup}>
              <label>협의 보수율</label>
              <div className={styles.inputWithUnit}>
                <input
                  type="number"
                  step="0.1"
                  value={commissionRate}
                  onChange={handleRateChange}
                />
                <span className={styles.unit}>%</span>
              </div>
              <p className={styles.rateInfo}>
                기본 상한 요율 {defaultRate}% (최대 {defaultRate}%)
              </p>
            </div>
          </div>

          {/* 계산하기 버튼 */}
          <button 
            className={styles.calculateButton}
            onClick={calculateCommission}
          >
            계산하기
          </button>
        </>
      ) : (
        /* 결과 화면 */
        <div className={styles.resultSection}>
          <h2 className={styles.resultTitle}>중개 수수료 계산 결과</h2>
          
          <div className={styles.resultItem}>
            <span>중개 수수료:</span>
            <span>{formatNumber(result.total)}원</span>
          </div>
          
          <div className={styles.resultItem}>
            <span>참고 부가가치세 (10% 가정):</span>
            <span>{formatNumber(result.vat)}원</span>
          </div>
          
          <div className={styles.resultItem}>
            <span className={styles.finalLabel}>총 중개 수수료:</span>
            <span className={styles.finalAmount}>{formatNumber(result.final)}원</span>
          </div>
          
          <div className={styles.note}>
            <p><strong>계산 결과 안내</strong></p>
            <p>※ 위 금액은 한쪽 당 납부하는 중개 수수료입니다.</p>
            <p>※ 실제 중개 수수료는 상한 요율 범위 내에서 협의로 결정됩니다.</p>
            <p>※ 계산 기준 거래금액은 {formatNumber(result.transactionAmount)}원, 적용 상한 요율은 {result.maxRate}%입니다.</p>
            <p>※ 부가가치세는 중개업소의 과세 유형과 거래 조건에 따라 별도로 부과될 수 있습니다.</p>
          </div>
          
          <button 
            className={styles.resetButton}
            onClick={resetCalculator}
          >
            다시하기
          </button>
        </div>
      )}

      {/* 정보 섹션 */}
      <div className={styles.infoSection}>
        <div className={styles.infoContainer}>
          {/* 사이트 소개 */}
          <div className={styles.infoArticle}>
            <h2 className={styles.infoTitle}>중개 수수료 계산기란?</h2>
            <p>
              이 웹사이트는 한국의 부동산 중개 수수료(중개료, 복비)를 계산하는 무료 온라인 도구입니다.
              공인중개사법과 시행규칙, 생활법령정보의 공개 안내를 바탕으로 일반적인 중개보수 상한 요율을
              반영하며, 참고용 예상 금액을 빠르게 확인할 수 있도록 구성했습니다.
            </p>
            <p>
              부동산 거래 시 한쪽 당 납부해야 하는 예상 중개 수수료를 미리 확인하고, 
              공인중개사와 협의할 때 참고 기준으로 활용할 수 있습니다. 실제 적용 금액은 지역 조례,
              거래 형태, 개별 사정에 따라 달라질 수 있습니다.
            </p>
          </div>

          {/* 부동산 유형별 설명 */}
          <div className={styles.infoArticle}>
            <h2 className={styles.infoTitle}>부동산 유형별 설명</h2>
            <div className={styles.categoryBox}>
              <h3 className={styles.categoryTitle}>🏠 주택</h3>
              <p>
                단독주택, 아파트, 다세대주택, 빌라 등 주거용 부동산을 의미합니다. 
                주택의 부속토지(대지, 정원 등)와 주택분양권도 포함됩니다. 
                주택은 다른 부동산 유형 중 중개 수수료율이 가장 낮게 설정되어 있으며, 
                거래금액에 따라 상한 요율이 다르게 적용됩니다.
              </p>
            </div>

            <div className={styles.categoryBox}>
              <h3 className={styles.categoryTitle}>🏢 오피스텔</h3>
              <p>
                부엌·화장실 등의 시설을 갖춘 전용면적 85㎡(약 26평) 이하의 오피스텔을 의미합니다. 
                법령상 시설 요건을 충족하는 경우 주택과는 별도의 중개보수 기준이 적용됩니다.
                매매·교환은 0.5%, 임대차는 0.4% 범위에서 중개보수를 정합니다.
              </p>
            </div>

            <div className={styles.categoryBox}>
              <h3 className={styles.categoryTitle}>🏬 주택 외</h3>
              <p>
                상가, 사무실, 의료시설, 토지, 그리고 주거용이 아닌 오피스텔 등이 포함됩니다. 
                상업용 부동산이므로 주택에 비해 중개 수수료율이 높게 설정되어 있습니다. 
                특수한 목적의 부동산일수록 중개 수수료가 더 높을 수 있습니다.
              </p>
            </div>
          </div>

          {/* 거래 유형별 설명 */}
          <div className={styles.infoArticle}>
            <h2 className={styles.infoTitle}>거래 유형별 설명</h2>
            <div className={styles.categoryBox}>
              <h3 className={styles.categoryTitle}>💰 매매 또는 교환</h3>
              <p>
                부동산 소유권이 완전히 이전되는 거래입니다. 매매는 금전과 부동산의 교환을, 
                교환은 부동산과 부동산의 교환을 의미합니다. 
                이 거래 방식은 실제 거래금액 자체에 대한 중개 수수료가 발생하며, 
                거래금액에 따라 상한 요율이 차등 적용됩니다.
              </p>
            </div>

            <div className={styles.categoryBox}>
              <h3 className={styles.categoryTitle}>🔑 전세</h3>
              <p>
                임차인이 집주인에게 선금(보증금)을 맡기고, 
                일정 기간(보통 2년) 동안 그 부동산을 사용하는 거래입니다. 
                한국 특유의 임대차 제도로, 월세와 달리 월 임차료가 없습니다. 
                중개 수수료는 보증금을 기준으로 계산됩니다.
              </p>
            </div>

            <div className={styles.categoryBox}>
              <h3 className={styles.categoryTitle}>📈 월세</h3>
              <p>
                임차인이 집주인에게 보증금과 월정액의 임차료(월세)를 지불하고 
                그 부동산을 사용하는 거래입니다. 
                중개 수수료는 보증금과 월세를 함께 고려하여 계산됩니다. 
                거래금액이 5천만원 미만인 소액 임대차는 보증금에 월세 70배를 더한 금액으로 계산합니다.
              </p>
            </div>
          </div>

          {/* 협의 수수료에 대한 설명 */}
          <div className={styles.infoArticle}>
            <h2 className={styles.infoTitle}>협의 수수료 및 법률 정보</h2>
            <div className={styles.legalBox}>
              <h3 className={styles.categoryTitle}>📋 공인중개사법 및 시행규칙 기준</h3>
              <p>
                <strong>상한 요율의 의미:</strong><br/>
                공인중개사법 제32조와 공인중개사법 시행규칙 제20조에 따라 중개보수 한도가 정해집니다.
                주택은 시·도 조례의 요율 한도 안에서, 주택 외 중개대상물은 시행규칙 범위 안에서
                실제 중개보수를 협의해 정합니다.
              </p>

              <p>
                <strong>주요 상한 요율 안내:</strong><br/>
                • 주택 매매·교환: 5천만원 미만 0.6%(한도 25만원), 5천만원 이상 2억원 미만 0.5%(한도 80만원), 2억원 이상 9억원 미만 0.4%, 9억원 이상 12억원 미만 0.5%, 12억원 이상 15억원 미만 0.6%, 15억원 이상 0.7%<br/>
                • 주택 임대차 등: 5천만원 미만 0.5%(한도 20만원), 5천만원 이상 1억원 미만 0.4%(한도 30만원), 1억원 이상 6억원 미만 0.3%, 6억원 이상 12억원 미만 0.4%, 12억원 이상 15억원 미만 0.5%, 15억원 이상 0.6%<br/>
                • 오피스텔: 법령상 요건을 충족하는 경우 매매·교환 0.5%, 임대차 등 0.4%<br/>
                • 상가·토지 등 주택 외 중개대상물: 거래금액의 0.9% 이내
              </p>

              <p>
                <strong>협의 수수료:</strong><br/>
                실제 중개 수수료는 상한 요율 범위 내에서 거래 당사자와 중개사 간의 협의로 결정됩니다. 
                거래의 복잡성, 중개사의 노력 정도, 지역 시장 상황 등을 고려하여 
                협상할 수 있습니다. 일반적으로 거래금액이 클수록, 거래가 복잡할수록 
                수수료 협상의 여지가 생길 수 있습니다.
              </p>

              <p>
                <strong>부가가치세(VAT):</strong><br/>
                중개보수에는 부가가치세가 별도로 부과될 수 있습니다.
                실제 청구 여부는 중개업소의 과세 유형과 거래 조건에 따라 달라질 수 있으므로,
                계약 전에 금액 산정 방식을 함께 확인하는 것이 좋습니다.
              </p>

              <p>
                <strong>참고사항:</strong><br/>
                이 계산기는 공개된 법령 및 생활법령 정보를 바탕으로 일반적인 경우를 계산합니다.
                경매, 공매, 권리관계가 복잡한 거래 등 특수한 상황은 반영하지 않을 수 있으며,
                최종 금액은 중개사 설명과 지역 조례를 함께 확인해 주세요.
              </p>
            </div>
          </div>

          {/* 면책 조항 */}
          <div className={styles.infoArticle}>
            <h2 className={styles.infoTitle}>⚠️ 면책 조항</h2>
            <p>
              이 계산기는 정보 제공을 목적으로 하며, 법률적 표현을 포함하지만 
              법적 조언을 제공하지 않습니다. 실제 거래에서의 중개 수수료는 
              다양한 요인(시장 상황, 거래의 특수성, 지역 관습 등)에 따라 
              달라질 수 있습니다. 최신 법령과 지역 조례, 계약 조건은 반드시 별도로 확인하시기 바랍니다.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <Link href="/privacy-policy">개인정보처리방침</Link>
            <Link href="/contact">문의</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
