package org.ai.SpringAiDemo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {
    private String title;
    private String question;
    private List<String> options;
    private int correct_answer_id;
    private String explanation;
}
