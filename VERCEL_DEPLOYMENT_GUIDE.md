# Vercel 재배포 가이드

## 방법 1: Vercel 대시보드에서 재배포 (가장 쉬움)

1. Vercel 대시보드 접속
2. 프로젝트 선택
3. **Deployments** 탭 클릭
4. 최신 배포 항목 찾기
5. 최신 배포 항목 오른쪽 **⋯ (점 3개)** 클릭
6. **Redeploy** 클릭
7. 확인 대화상자에서 **Redeploy** 버튼 클릭
8. 배포 완료까지 대기 (보통 1-2분)

## 방법 2: Git 커밋으로 자동 재배포

로컬에서 변경사항 커밋 후 푸시하면 자동 재배포됩니다.

```bash
git add .
git commit -m "Update Supabase configuration"
git push
```

## 배포 완료 확인

배포가 완료되면:
- ✅ 상태가 "Ready"로 표시됨
- ✅ 초록색 체크 표시
- ✅ 배포 URL 클릭 가능

