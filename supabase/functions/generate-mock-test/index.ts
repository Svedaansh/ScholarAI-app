import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, className, chapter, topics, maxMarks } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const prompt = `Generate a comprehensive mock test paper with the following specifications:
- Subject: ${subject}
- Class: ${className}
- Chapter: ${chapter}
- Topics: ${topics}
- Maximum Marks: ${maxMarks}

Create a well-structured test paper with:
1. Multiple Choice Questions (MCQs) - 40% of marks
2. Short Answer Questions - 30% of marks
3. Long Answer Questions - 30% of marks

Include diagrams descriptions where relevant (especially for Science and Math).
Format the output as a structured JSON with sections, questions, options (for MCQs), marks allocation, and diagram descriptions.

Return JSON format:
{
  "title": "Test title",
  "sections": [
    {
      "name": "Section A - Multiple Choice Questions",
      "questions": [
        {
          "number": 1,
          "question": "Question text",
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "correctAnswer": "A",
          "marks": 1,
          "diagram": "Description of diagram if needed"
        }
      ]
    }
  ]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert educator who creates high-quality examination papers. Always respond with valid JSON only, no additional text.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.status, await response.text());
      throw new Error('Failed to generate test');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response from AI
    let testData;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      testData = JSON.parse(cleanContent);
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      testData,
      metadata: {
        subject,
        className,
        chapter,
        topics,
        maxMarks,
        generatedAt: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-mock-test:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
