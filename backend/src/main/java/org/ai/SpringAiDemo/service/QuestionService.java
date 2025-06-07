package org.ai.SpringAiDemo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.ai.SpringAiDemo.response.QuestionResponse;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;

    public QuestionResponse createQuestion(String difficulty) throws Exception {
        // Build the prompt manually using String.format or concatenation
        String promptContent = """
            You are an expert coding challenge creator.
            Generate a %s level coding question with these requirements:

            - Multiple choice format with 4 options
            - Only one correct answer
            - Plausible distractors
            - Clear explanation
            - Language-agnostic concepts preferred

            Return response in this exact JSON format:
            {
                "title": "string",
                "question": "string",
                "options": ["string", "string", "string", "string"],
                "correct_answer_id": integer (0-3),
                "explanation": "string"
            }

            Important:
            - Only return valid JSON
            - No additional text outside the JSON
            - Escape all special characters
            - Difficulty: %s
            """.formatted(difficulty, difficulty);

        try {
            Prompt prompt = new Prompt(promptContent);

            String jsonResponse = chatModel.call(prompt)
                    .getResult()
                    .getOutput()
                    .getContent()
                    .trim();


            jsonResponse = jsonResponse.replaceAll("^```json\\s*|\\s*```$", "");

            return objectMapper.readValue(jsonResponse, QuestionResponse.class);

        } catch (Exception e) {
            throw new Exception("Failed to parse question response", e);
        }
    }
}
