/**
 * 기존 더미 데이터를 Supabase로 마이그레이션하는 스크립트
 * 
 * 사용법:
 * 1. 환경 변수 설정 (.env.local에 SUPABASE_URL과 SUPABASE_ANON_KEY 설정)
 * 2. ts-node 또는 tsx로 실행: npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import { developerData, projectsData } from '../lib/data';
import { getGuestbookEntries } from '../lib/guestbook-data';
import { getLikesData } from '../lib/likes-data';
import { getRecommendations } from '../lib/recommendations-data';

// 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 .env.local에 설정해주세요.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateData() {
  console.log('🚀 데이터 마이그레이션을 시작합니다...\n');

  try {
    // 1. 개발자 정보 마이그레이션
    console.log('📝 1. 개발자 정보 마이그레이션 중...');
    const { data: existingDeveloper, error: checkDevError } = await supabase
      .from('developer')
      .select('id')
      .eq('id', developerData.id)
      .single();

    if (existingDeveloper) {
      console.log('   ⚠️  개발자 정보가 이미 존재합니다. 업데이트합니다...');
      const { error: updateError } = await supabase
        .from('developer')
        .update({
          name: developerData.name,
          title: developerData.title,
          description: developerData.description,
          location: developerData.location,
          education: developerData.education,
          email: developerData.email,
          github: developerData.github,
          linkedin: developerData.linkedin,
          philosophy: developerData.philosophy,
          experience: developerData.experience,
          updated_at: new Date().toISOString()
        })
        .eq('id', developerData.id);

      if (updateError) throw updateError;
      console.log('   ✅ 개발자 정보 업데이트 완료');
    } else {
      const { error: insertError } = await supabase
        .from('developer')
        .insert({
          id: developerData.id,
          name: developerData.name,
          title: developerData.title,
          description: developerData.description,
          location: developerData.location,
          education: developerData.education,
          email: developerData.email,
          github: developerData.github,
          linkedin: developerData.linkedin,
          philosophy: developerData.philosophy,
          experience: developerData.experience
        });

      if (insertError) throw insertError;
      console.log('   ✅ 개발자 정보 생성 완료');
    }

    // 2. 기술 스택 마이그레이션
    console.log('\n📚 2. 기술 스택 마이그레이션 중...');
    for (const skill of developerData.skills) {
      const { data: existingSkill, error: checkError } = await supabase
        .from('skills')
        .select('id')
        .eq('name', skill.name)
        .single();

      if (existingSkill) {
        console.log(`   ⚠️  "${skill.name}" 이미 존재합니다. 스킵합니다...`);
        continue;
      }

      const { error: insertError } = await supabase
        .from('skills')
        .insert({
          name: skill.name,
          icon: skill.icon,
          level: skill.level,
          category: skill.category
        });

      if (insertError) {
        console.error(`   ❌ "${skill.name}" 삽입 실패:`, insertError.message);
      } else {
        console.log(`   ✅ "${skill.name}" 추가 완료`);
      }
    }

    // 3. 프로젝트 마이그레이션
    console.log('\n💼 3. 프로젝트 마이그레이션 중...');
    for (const project of projectsData) {
      const { data: existingProject, error: checkError } = await supabase
        .from('projects')
        .select('id')
        .eq('id', project.id)
        .single();

      // 날짜 형식 변환 (YYYY-MM-DD -> ISO 형식)
      const createdAtISO = new Date(project.createdAt).toISOString();
      const updatedAtISO = new Date(project.updatedAt).toISOString();

      const projectData = {
        id: project.id,
        title: project.title,
        description: project.description,
        detailed_description: project.detailedDescription,
        tech: project.tech,
        status: project.status,
        image: project.image,
        github_url: project.githubUrl,
        demo_url: project.demoUrl,
        features: project.features,
        duration: project.duration,
        team_size: project.teamSize,
        challenges: project.challenges,
        solutions: project.solutions,
        created_at: createdAtISO,
        updated_at: updatedAtISO
      };

      if (existingProject) {
        console.log(`   ⚠️  "${project.title}" 이미 존재합니다. 업데이트합니다...`);
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);

        if (updateError) {
          console.error(`   ❌ "${project.title}" 업데이트 실패:`, updateError.message);
        } else {
          console.log(`   ✅ "${project.title}" 업데이트 완료`);
        }
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert(projectData);

        if (insertError) {
          console.error(`   ❌ "${project.title}" 삽입 실패:`, insertError.message);
        } else {
          console.log(`   ✅ "${project.title}" 추가 완료`);
        }
      }
    }

    // 4. 방명록 마이그레이션
    console.log('\n📖 4. 방명록 마이그레이션 중...');
    const guestbookEntries = getGuestbookEntries();
    
    for (const entry of guestbookEntries) {
      // UUID 형식 검증 (기존 ID가 UUID가 아닐 수 있음)
      let entryId = entry.id;
      
      // 기존 ID가 UUID 형식이 아니면 새로 생성하지 않고 확인만
      const { data: existingEntry, error: checkError } = await supabase
        .from('guestbook')
        .select('id')
        .eq('name', entry.name)
        .eq('message', entry.message)
        .single();

      if (existingEntry) {
        console.log(`   ⚠️  "${entry.name}"의 메시지가 이미 존재합니다. 스킵합니다...`);
        continue;
      }

      const { error: insertError } = await supabase
        .from('guestbook')
        .insert({
          name: entry.name,
          message: entry.message,
          created_at: entry.createdAt,
          updated_at: entry.updatedAt
        });

      if (insertError) {
        console.error(`   ❌ "${entry.name}" 방명록 삽입 실패:`, insertError.message);
      } else {
        console.log(`   ✅ "${entry.name}" 방명록 추가 완료`);
      }
    }

    // 5. 좋아요 마이그레이션
    console.log('\n❤️  5. 좋아요 마이그레이션 중...');
    const likesData = getLikesData();
    
    for (const like of likesData) {
      const { data: existingLike, error: checkError } = await supabase
        .from('likes')
        .select('id')
        .eq('item_id', like.itemId)
        .eq('item_type', like.itemType)
        .single();

      if (existingLike) {
        console.log(`   ⚠️  "${like.itemId}" (${like.itemType}) 이미 존재합니다. 업데이트합니다...`);
        const { error: updateError } = await supabase
          .from('likes')
          .update({
            count: like.count,
            updated_at: like.updatedAt
          })
          .eq('id', existingLike.id);

        if (updateError) {
          console.error(`   ❌ "${like.itemId}" 업데이트 실패:`, updateError.message);
        } else {
          console.log(`   ✅ "${like.itemId}" 업데이트 완료`);
        }
      } else {
        const { error: insertError } = await supabase
          .from('likes')
          .insert({
            item_id: like.itemId,
            item_type: like.itemType,
            count: like.count,
            created_at: like.createdAt,
            updated_at: like.updatedAt
          });

        if (insertError) {
          console.error(`   ❌ "${like.itemId}" 삽입 실패:`, insertError.message);
        } else {
          console.log(`   ✅ "${like.itemId}" 추가 완료`);
        }
      }
    }

    // 6. 추천 문구 마이그레이션
    console.log('\n💭 6. 추천 문구 마이그레이션 중...');
    const recommendations = getRecommendations();
    
    for (const rec of recommendations) {
      const { data: existingRec, error: checkError } = await supabase
        .from('recommendations')
        .select('id')
        .eq('content', rec.content)
        .single();

      if (existingRec) {
        console.log(`   ⚠️  추천 문구가 이미 존재합니다. 스킵합니다...`);
        continue;
      }

      const { error: insertError } = await supabase
        .from('recommendations')
        .insert({
          content: rec.content,
          author: rec.author,
          category: rec.category,
          created_at: rec.createdAt
        });

      if (insertError) {
        console.error(`   ❌ 추천 문구 삽입 실패:`, insertError.message);
      } else {
        console.log(`   ✅ 추천 문구 추가 완료: "${rec.content.substring(0, 30)}..."`);
      }
    }

    console.log('\n✨ 모든 데이터 마이그레이션이 완료되었습니다!');
    console.log('\n📊 마이그레이션 요약:');
    console.log(`   - 개발자 정보: 1개`);
    console.log(`   - 기술 스택: ${developerData.skills.length}개`);
    console.log(`   - 프로젝트: ${projectsData.length}개`);
    console.log(`   - 방명록: ${guestbookEntries.length}개`);
    console.log(`   - 좋아요: ${likesData.length}개`);
    console.log(`   - 추천 문구: ${recommendations.length}개`);

  } catch (error: any) {
    console.error('\n❌ 마이그레이션 중 오류가 발생했습니다:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// 스크립트 실행
migrateData();
