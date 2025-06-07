package org.ai.SpringAiDemo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatModel chatModel;

    public String getResponse(String prompt) {
        ChatResponse response = chatModel.call(new Prompt(prompt));
        return response.getResult().getOutput().getContent();
    }
}
