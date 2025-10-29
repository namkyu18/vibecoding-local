/**
 * 환경 변수 확인 스크립트
 * npm run check-env 실행 시 환경 변수 설정 상태를 확인합니다.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Supabase 환경 변수 확인\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('❌ 환경 변수가 설정되지 않았습니다.\n');
  console.log('📝 다음 단계를 따라 환경 변수를 설정하세요:\n');
  console.log('1. Supabase 대시보드 접속: https://supabase.com');
  console.log('2. 프로젝트 선택 (또는 새 프로젝트 생성)');
  console.log('3. Settings > API 메뉴 이동');
  console.log('4. Project URL과 anon public key 복사\n');
  console.log('5. 프로젝트 루트에 .env.local 파일 생성:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_project_url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key\n');
  process.exit(1);
} else {
  console.log('✅ 환경 변수가 설정되어 있습니다.\n');
  console.log(`📌 Supabase URL: ${supabaseUrl.substring(0, 30)}...`);
  console.log(`📌 Anon Key: ${supabaseAnonKey.substring(0, 20)}...\n`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}
